import { describe, expect, it } from 'vitest'
import { homeSchema, projectsSchema, siteSchema } from '../content/schema'
import { format, getContent } from './content'
import { locales } from './locales'

function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => keyPaths(item, `${prefix}[${index}]`))
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    )
  }
  return [prefix]
}

describe.each(locales)('conteúdo em %s', (locale) => {
  const content = getContent(locale)

  it('segue o schema do site', () => {
    expect(siteSchema.parse(content.site)).toBeTruthy()
  })

  it('segue o schema da página principal', () => {
    expect(homeSchema.parse(content.home)).toBeTruthy()
  })

  it('segue o schema dos projetos', () => {
    expect(projectsSchema.parse(content.projects)).toBeTruthy()
  })

  it('não repete slugs de projeto', () => {
    const slugs = content.projects.items.map((item) => item.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('aponta os resultados em destaque para projetos existentes', () => {
    const slugs = content.projects.items.map((item) => item.slug)
    for (const item of content.home.highlights.items) {
      if (item.projectSlug) expect(slugs).toContain(item.projectSlug)
    }
  })
})

describe('paridade entre idiomas', () => {
  it('tem as mesmas chaves em todos os idiomas', () => {
    const [base, ...others] = locales.map((locale) => keyPaths(getContent(locale)).sort())
    for (const other of others) {
      expect(other).toEqual(base)
    }
  })

  it('usa os mesmos slugs de projeto na mesma ordem', () => {
    const slugs = locales.map((locale) =>
      getContent(locale).projects.items.map((item) => item.slug),
    )
    for (const other of slugs.slice(1)) {
      expect(other).toEqual(slugs[0])
    }
  })
})

describe('format', () => {
  it('substitui marcadores', () => {
    expect(format('{title} — Eduardo Kipper', { title: 'X' })).toBe('X — Eduardo Kipper')
    expect(format('Equipe de {count} pessoas', { count: 6 })).toBe('Equipe de 6 pessoas')
  })

  it('mantém marcadores sem valor', () => {
    expect(format('{a} {b}', { a: '1' })).toBe('1 {b}')
  })
})
