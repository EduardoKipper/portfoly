import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '../test/renderRoute'

const h1 = () => screen.getByRole('heading', { level: 1 })

describe('rotas', () => {
  it('abre a página principal em português na raiz', async () => {
    renderRoute('/')
    expect(h1()).toHaveTextContent('Eduardo Kipper')
    expect(h1()).toHaveTextContent('Desenvolvedor Full Stack')
    await waitFor(() => expect(document.documentElement.lang).toBe('pt-BR'))
  })

  it('abre a página principal em inglês em /en', async () => {
    renderRoute('/en')
    expect(h1()).toHaveTextContent('Full Stack Developer')
    await waitFor(() => expect(document.documentElement.lang).toBe('en'))
  })

  it('mostra o detalhe de um projeto em português', () => {
    renderRoute('/projetos/automacao-hotelbeds')
    expect(h1()).toHaveTextContent('Automação Hotelbeds')
    expect(screen.getByRole('link', { name: 'Voltar aos projetos' })).toHaveAttribute(
      'href',
      '/#projetos',
    )
    expect(screen.getByText('16 h/semana')).toBeInTheDocument()
  })

  it('usa o caminho em inglês para o detalhe de projeto', () => {
    renderRoute('/en/projects/automacao-hotelbeds')
    expect(h1()).toHaveTextContent('Hotelbeds automation')
    expect(screen.getByRole('link', { name: 'Back to projects' })).toHaveAttribute(
      'href',
      '/en#projetos',
    )
  })

  it('mostra a página não encontrada para projeto inexistente', () => {
    renderRoute('/projetos/nao-existe')
    expect(h1()).toHaveTextContent('Não encontrei esta página.')
  })

  it('mostra a página não encontrada no idioma da rota', () => {
    renderRoute('/en/qualquer-coisa')
    expect(h1()).toHaveTextContent("I couldn't find this page.")
    expect(screen.getByRole('link', { name: 'Back to portfolio' })).toHaveAttribute('href', '/en')
  })

  it('atualiza o título da aba ao navegar', async () => {
    renderRoute('/en/projects/automacao-caixa')
    await waitFor(() => expect(document.title).toBe('Cash process automation — Eduardo Kipper'))
  })

  it('oferece o link para pular ao conteúdo', () => {
    renderRoute('/')
    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute(
      'href',
      '#conteudo',
    )
  })
})

describe('página principal', () => {
  it('mostra todas as seções da especificação', () => {
    renderRoute('/')
    for (const name of [
      'Soluções que fazem parte da operação.',
      'Tecnologia com contexto de negócio.',
      'Experiência',
      'Ferramentas e conhecimentos.',
      'Formação e desenvolvimento',
      'Vamos conversar?',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
  })

  it('lista os sete projetos com link para o detalhe', () => {
    renderRoute('/')
    const section = screen.getByRole('region', { name: 'Soluções que fazem parte da operação.' })
    const links = within(section).getAllByRole('link')
    expect(links).toHaveLength(7)
    expect(links[0]).toHaveAttribute('href', '/projetos/sistema-interno-arquivos-comunicacao')
  })

  it('navega pelas âncoras do menu', () => {
    renderRoute('/')
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' })
    expect(within(nav).getByRole('link', { name: 'Projetos' })).toHaveAttribute(
      'href',
      '/#projetos',
    )
    expect(within(nav).getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '/#contato')
  })

  it('troca de idioma pelo switch mantendo a página', async () => {
    const user = userEvent.setup()
    const { router } = renderRoute('/projetos/automacao-caixa')
    const toggle = screen.getByRole('switch', { name: 'Versão em inglês' })
    expect(toggle).toHaveAttribute('aria-checked', 'false')

    await user.click(toggle)
    expect(router.state.location.pathname).toBe('/en/projects/automacao-caixa')
    const englishToggle = screen.getByRole('switch', { name: 'English version' })
    expect(englishToggle).toHaveAttribute('aria-checked', 'true')

    englishToggle.focus()
    await user.keyboard(' ')
    expect(router.state.location.pathname).toBe('/projetos/automacao-caixa')
  })

  it('abre e fecha o menu móvel, inclusive com Escape', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAccessibleName('Fechar menu')

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('expande a lista de cursos', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    expect(screen.queryByText('CSS: Flexbox e layouts responsivos')).not.toBeInTheDocument()

    const button = screen.getByRole('button', { name: 'Ver todos os cursos' })
    await user.click(button)

    expect(screen.getByText('CSS: Flexbox e layouts responsivos')).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveTextContent('Mostrar menos cursos')
  })

  it('oferece contato por e-mail', () => {
    renderRoute('/')
    expect(screen.getByRole('link', { name: 'Enviar e-mail' })).toHaveAttribute(
      'href',
      'mailto:eduardo.k.rubio@gmail.com',
    )
  })

  it('omite o botão de currículo enquanto não houver arquivo', () => {
    renderRoute('/')
    expect(screen.queryByRole('link', { name: 'Baixar currículo' })).not.toBeInTheDocument()
  })
})
