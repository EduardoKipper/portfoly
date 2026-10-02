import { describe, expect, it } from 'vitest'
import { alternatePath, homePath, projectPath } from './locales'

describe('locales', () => {
  it('monta caminhos por idioma', () => {
    expect(homePath('pt')).toBe('/')
    expect(homePath('en')).toBe('/en')
    expect(projectPath('pt', 'a')).toBe('/projetos/a')
    expect(projectPath('en', 'a')).toBe('/en/projects/a')
  })

  it('troca o idioma mantendo a página', () => {
    expect(alternatePath('/', 'en')).toBe('/en')
    expect(alternatePath('/en', 'pt')).toBe('/')
    expect(alternatePath('/en/', 'pt')).toBe('/')
    expect(alternatePath('/projetos/a', 'en')).toBe('/en/projects/a')
    expect(alternatePath('/en/projects/a', 'pt')).toBe('/projetos/a')
    expect(alternatePath('/qualquer', 'en')).toBe('/en/qualquer')
    expect(alternatePath('/en/qualquer', 'pt')).toBe('/qualquer')
  })
})
