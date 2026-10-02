import { describe, expect, it } from 'vitest'
import { getRouteHead, sitePaths } from './routeHead'

describe('metadados por rota', () => {
  it('usa título e descrição do idioma da página principal', () => {
    expect(getRouteHead('/').title).toBe('Eduardo Kipper — Desenvolvedor Full Stack')
    expect(getRouteHead('/en/').title).toBe('Eduardo Kipper — Full Stack Developer')
    expect(getRouteHead('/en').alternates).toEqual({ pt: '/', en: '/en' })
  })

  it('usa o projeto no título e no resumo', () => {
    const head = getRouteHead('/en/projects/automacao-caixa')
    expect(head.title).toBe('Cash process automation — Eduardo Kipper')
    expect(head.description).toBe('Standardization and automation of the cash process.')
    expect(head.alternates.pt).toBe('/projetos/automacao-caixa')
  })

  it('marca páginas inexistentes', () => {
    expect(getRouteHead('/projetos/nao-existe').found).toBe(false)
    expect(getRouteHead('/en/x').title).toBe("I couldn't find this page.")
  })

  it('lista todas as páginas para pré-renderizar', () => {
    const paths = sitePaths()
    expect(paths).toHaveLength(16)
    expect(paths).toContain('/en/projects/formulario-notas-fiscais')
    expect(paths.every((path) => getRouteHead(path).found)).toBe(true)
  })
})
