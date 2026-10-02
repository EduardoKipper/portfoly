import { findProject, format, getContent } from '../i18n/content'
import {
  homePath,
  localePrefix,
  locales,
  projectPath,
  projectsSegment,
  type Locale,
} from '../i18n/locales'

export interface RouteHead {
  locale: Locale
  title: string
  description: string
  /** Página válida e indexável. Falso para a página não encontrada. */
  found: boolean
  /** Caminho equivalente em cada idioma (somente para páginas encontradas). */
  alternates: Partial<Record<Locale, string>>
}

function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const enPrefix = localePrefix.en
  if (pathname === enPrefix || pathname.startsWith(`${enPrefix}/`)) {
    return { locale: 'en', rest: pathname.slice(enPrefix.length) || '/' }
  }
  return { locale: 'pt', rest: pathname || '/' }
}

/** Título, descrição e alternativas de idioma de um caminho (sem o base do site). */
export function getRouteHead(pathname: string): RouteHead {
  const { locale, rest } = splitLocale(pathname.replace(/(.)\/$/, '$1'))
  const { site } = getContent(locale)

  if (rest === '/') {
    return {
      locale,
      title: site.meta.pageTitle,
      description: site.meta.description,
      found: true,
      alternates: Object.fromEntries(locales.map((l) => [l, homePath(l)])),
    }
  }

  const match = rest.match(new RegExp(`^/${projectsSegment[locale]}/([^/]+)$`))
  const project = match ? findProject(locale, match[1]) : undefined
  if (project) {
    return {
      locale,
      title: format(site.meta.projectPageTitle, { title: project.title }),
      description: project.summary,
      found: true,
      alternates: Object.fromEntries(locales.map((l) => [l, projectPath(l, project.slug)])),
    }
  }

  return {
    locale,
    title: site.notFound.title,
    description: site.meta.description,
    found: false,
    alternates: {},
  }
}

/** Todos os caminhos que existem no site, para pré-renderização e sitemap. */
export function sitePaths(): string[] {
  return locales.flatMap((locale) => [
    homePath(locale),
    ...getContent(locale).projects.items.map((project) => projectPath(locale, project.slug)),
  ])
}
