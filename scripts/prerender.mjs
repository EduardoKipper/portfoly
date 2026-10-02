/*
 * Gera um HTML estático para cada página do site a partir do build do Vite.
 * Assim cada endereço responde 200 com conteúdo e metadados próprios (SEO e prévias),
 * e o React apenas hidrata a página no navegador.
 *
 * Entrada: dist/ (build do cliente) e dist-ssr/entry-server.js (build SSR).
 * Saída: dist/<caminho>/index.html, dist/404.html, dist/sitemap.xml e dist/robots.txt.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = 'dist'
const ssrEntry = pathToFileURL(join('dist-ssr', 'entry-server.js')).href
const { render, getRouteHead, sitePaths, htmlLang } = await import(ssrEntry)

const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/')
const siteUrl = (process.env.SITE_URL ?? '').replace(/\/$/, '')
const template = await readFile(join(dist, 'index.html'), 'utf8')

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Com barra final: é o endereço que o GitHub Pages serve sem redirecionar.
const absoluteUrl = (path) => (path === '/' ? `${siteUrl}/` : `${siteUrl}${path}/`)

function headTags(head, path) {
  const tags = [`<title>${escapeHtml(head.title)}</title>`]
  if (!head.found) {
    tags.push('<meta name="robots" content="noindex" />')
    return tags
  }
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:locale" content="${head.locale === 'pt' ? 'pt_BR' : 'en_US'}" />`,
    `<meta name="twitter:card" content="summary" />`,
  )
  if (siteUrl) {
    tags.push(
      `<link rel="canonical" href="${absoluteUrl(path)}" />`,
      `<meta property="og:url" content="${absoluteUrl(path)}" />`,
    )
    for (const [locale, alternate] of Object.entries(head.alternates)) {
      tags.push(
        `<link rel="alternate" hreflang="${htmlLang[locale]}" href="${absoluteUrl(alternate)}" />`,
      )
    }
    if (head.alternates.pt) {
      tags.push(
        `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(head.alternates.pt)}" />`,
      )
    }
  }
  return tags
}

function page(head, path, appHtml) {
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang[head.locale]}">`)
    .replace(
      '<meta name="description" content="" />',
      `<meta name="description" content="${escapeHtml(head.description)}" />`,
    )
    .replace('<!--app-head-->', headTags(head, path).join('\n    '))
    .replace(
      '<div id="root"><!--app-html--></div>',
      `<div id="root" data-path="${path}">${appHtml}</div>`,
    )
}

const paths = sitePaths()
for (const path of paths) {
  const head = getRouteHead(path)
  const html = page(head, path, await render(path))
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

// Rotas desconhecidas: o GitHub Pages serve o 404.html, que o React renderiza no idioma da URL.
// Sem data-path: o app sempre renderiza do zero nessa página.
await writeFile(join(dist, '404.html'), page(getRouteHead('/404'), '', ''))

if (siteUrl) {
  const urls = paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join('\n')
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
}
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *\nDisallow: ${base}admin/\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
)

await rm('dist-ssr', { recursive: true, force: true })
console.log(`Pré-renderizadas ${paths.length} páginas.`)
