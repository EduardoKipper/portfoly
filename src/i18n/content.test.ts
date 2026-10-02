import { describe, expect, it } from 'vitest'
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

describe('conteúdo', () => {
  it('tem as mesmas chaves em todos os idiomas', () => {
    const [base, ...others] = locales.map((locale) => keyPaths(getContent(locale)).sort())
    for (const other of others) {
      expect(other).toEqual(base)
    }
  })

  it('não deixa textos vazios', () => {
    for (const locale of locales) {
      const content = getContent(locale)
      const strings = JSON.stringify(content).match(/"[^"]*"/g) ?? []
      expect(strings).not.toContain('""')
    }
  })

  it('usa os mesmos slugs de projeto em todos os idiomas', () => {
    const slugs = locales.map((locale) =>
      getContent(locale).projects.items.map((item) => item.slug),
    )
    expect(slugs[1]).toEqual(slugs[0])
  })

  it('substitui marcadores no formato', () => {
    expect(format('{title} — Eduardo Kipper', { title: 'X' })).toBe('X — Eduardo Kipper')
  })
})
