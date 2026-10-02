// @vitest-environment node
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const tokensCss = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8')

function token(name: string): string {
  const match = tokensCss.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))
  if (!match) throw new Error(`Token --${name} não encontrado`)
  return match[1]
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

// Pares usados para texto na interface (portfolio-spec.md, seção 2.1, e contraste-paleta.txt).
const textPairs: [foreground: string, background: string][] = [
  ['text', 'bg'],
  ['text-muted', 'bg'],
  ['accent', 'bg'],
  ['sage', 'bg'],
  ['rose', 'bg'],
  ['text', 'surface'],
  ['text-muted', 'surface'],
  ['accent', 'surface'],
  ['sage', 'surface'],
  ['rose', 'surface'],
  ['bg', 'accent'],
  ['bg', 'accent-hover'],
  ['bg', 'sage'],
  ['bg', 'rose'],
]

describe('contraste da paleta', () => {
  it.each(textPairs)('%s sobre %s atinge 4,5:1', (foreground, background) => {
    expect(contrast(token(foreground), token(background))).toBeGreaterThanOrEqual(4.5)
  })

  it('usa Âmbar no foco com pelo menos 3:1 sobre os fundos', () => {
    expect(tokensCss).toMatch(/--focus-color:\s*var\(--accent\)/)
    for (const background of ['bg', 'surface']) {
      expect(contrast(token('accent'), token(background))).toBeGreaterThanOrEqual(3)
    }
  })

  it('reprova Marfim sobre Âmbar, como indicado na especificação', () => {
    expect(contrast(token('text'), token('accent'))).toBeLessThan(4.5)
  })
})
