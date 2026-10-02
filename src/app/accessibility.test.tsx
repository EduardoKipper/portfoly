import axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '../test/renderRoute'

// O jsdom não calcula estilos, então contraste é verificado em src/styles/contrast.test.ts.
const options: axe.RunOptions = { rules: { 'color-contrast': { enabled: false } } }

const paths = [
  '/',
  '/en',
  '/projetos/sistema-interno-arquivos-comunicacao',
  '/en/projects/automacao-hotelbeds',
  '/nao-existe',
]

describe('acessibilidade (axe)', () => {
  it.each(paths)('não tem violações em %s', async (path) => {
    const { container } = renderRoute(path)
    const results = await axe.run(container, options)
    const summary = results.violations.map(
      (violation) => `${violation.id}: ${violation.nodes.map((node) => node.target).join(', ')}`,
    )
    expect(summary).toEqual([])
  })
})
