import { describe, expect, it } from 'vitest'
import { homePath, projectPath } from './locales'

describe('locales', () => {
  it('monta caminhos por idioma', () => {
    expect(homePath('pt')).toBe('/')
    expect(homePath('en')).toBe('/en')
    expect(projectPath('pt', 'a')).toBe('/projetos/a')
    expect(projectPath('en', 'a')).toBe('/en/projects/a')
  })
})
