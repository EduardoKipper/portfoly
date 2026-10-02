# Identidade visual: Noite Âmbar

A fonte de verdade da identidade é a seção 2 de `portfolio-spec.md`. No código, ela vira tokens CSS.

## Arquivos

```
src/styles/
  index.css           Ponto de entrada: fonte, tokens, base e componentes
  tokens.css          Variáveis CSS: cores, tipografia, espaço, forma, foco e movimento
  base.css            Estilos dos elementos HTML (body, títulos, links, foco)
  components.css      Padrões compartilhados: .container, .section, .button, .card, .tag
  contrast.test.ts    Verifica o contraste dos pares de cor usados em texto
```

Estilos específicos de um componente ficam em um arquivo `.css` ao lado dele e usam somente tokens, nunca valores de cor soltos.

## Cores

| Token          | Cor       | HEX       | Uso                                  |
| -------------- | --------- | --------- | ------------------------------------ |
| `--bg`         | Noite     | `#10141D` | Fundo principal e texto sobre acento |
| `--surface`    | Ardósia   | `#1C2431` | Cards, navegação e superfícies       |
| `--text-muted` | Névoa     | `#A9B3C2` | Legendas, datas e texto secundário   |
| `--text`       | Marfim    | `#F5F1E8` | Títulos e texto principal            |
| `--accent`     | Âmbar     | `#F28A2E` | CTA principal, links e assinatura    |
| `--sage`       | Sálvia    | `#9DB28C` | Destaques de resultados              |
| `--rose`       | Rosa seco | `#D18B9F` | Detalhes editoriais                  |

Regras:

- Texto Marfim ou Névoa sobre Noite ou Ardósia. Nunca Marfim sobre Âmbar, Sálvia ou Rosa seco.
- Botão principal: fundo Âmbar com texto Noite (`--on-accent`). No hover o fundo clareia para `--accent-hover`; pressionado desloca 1 px.
- Links não usam sublinhado (pedido do usuário em 02/10/2026). São identificados pela cor Âmbar e pelo contexto (menu, botões, setas); no hover passam para Marfim.
- Um acento dominante por bloco.
- Novos pares de cor para texto entram na lista de `contrast.test.ts`, que exige 4,5:1.

## Tipografia

- Fonte Inter variável, empacotada com o site (`@fontsource-variable/inter`), sem requisição a serviços externos. Segoe UI e a fonte do sistema são o fallback.
- Tamanhos fluidos com `clamp()`: H1 de 36 a 64 px, H2 de 28 a 40 px, corpo de 16 a 18 px, metadados com no mínimo 14 px.
- Parágrafos limitados a 68 caracteres (`--measure`).

## Espaço e layout

- Escala em múltiplos de 8 px (`--space-1` = 8 px até `--space-14` = 112 px).
- Conteúdo com largura máxima de 1200 px dentro de `.container`, com margens laterais de 20 a 48 px (`--gutter`).
- Seções com 48 a 112 px de espaço vertical (`.section`).
- Cards com raio de 12 px; botões com raio de 8 px e área de toque mínima de 44 px.

## Foco e movimento

- Foco visível em todo elemento interativo: contorno Âmbar de 2 px com afastamento de 3 px. A especificação sugeria Rosa seco; o usuário pediu Âmbar em 02/10/2026. O teste de contraste garante pelo menos 3:1 sobre os fundos.
- Transições de 150 a 220 ms. Com `prefers-reduced-motion: reduce`, as durações vão a zero e a rolagem suave é desligada.

## Seletor de idioma

`src/components/LanguageSwitch.tsx`: um switch (`role="switch"`) com as bandeiras do Brasil e dos EUA. Desligado é português e ligado é inglês. Troca com clique, toque, teclado (Espaço ou Enter) ou arrastando o anel Âmbar até a outra bandeira, e mantém a página e a seção atuais. As bandeiras são SVG decorativos (`Flags.tsx`); o nome acessível vem do conteúdo (`site.header.englishVersion`).
