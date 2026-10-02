import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '../test/renderRoute'

describe('rotas', () => {
  it('abre a página principal em português na raiz', async () => {
    renderRoute('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Desenvolvedor Full Stack')
    await waitFor(() => expect(document.documentElement.lang).toBe('pt-BR'))
  })

  it('abre a página principal em inglês em /en', async () => {
    renderRoute('/en')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Full Stack Developer')
    await waitFor(() => expect(document.documentElement.lang).toBe('en'))
  })

  it('mostra o detalhe de um projeto existente nos dois idiomas', () => {
    renderRoute('/projetos/automacao-hotelbeds')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Automação Hotelbeds')
    expect(screen.getByRole('link', { name: 'Voltar aos projetos' })).toHaveAttribute(
      'href',
      '/#projetos',
    )
  })

  it('usa o caminho em inglês para o detalhe de projeto', () => {
    renderRoute('/en/projects/automacao-hotelbeds')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hotelbeds automation')
    expect(screen.getByRole('link', { name: 'Back to projects' })).toHaveAttribute(
      'href',
      '/en#projetos',
    )
  })

  it('mostra a página não encontrada para projeto inexistente', () => {
    renderRoute('/projetos/nao-existe')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Não encontrei esta página.',
    )
  })

  it('mostra a página não encontrada no idioma da rota', () => {
    renderRoute('/en/qualquer-coisa')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "I couldn't find this page.",
    )
    expect(screen.getByRole('link', { name: 'Back to portfolio' })).toHaveAttribute('href', '/en')
  })

  it('oferece o link para pular ao conteúdo', () => {
    renderRoute('/')
    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute(
      'href',
      '#conteudo',
    )
  })
})
