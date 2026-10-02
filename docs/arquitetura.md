# Arquitetura

## Stack

- **Vite + React 19 + TypeScript**: site estático (SPA), sem servidor próprio.
- **React Router** (modo de dados, `createBrowserRouter`): rotas por idioma.
- **oxlint** para lint e **Prettier** para formatação.
- **Vitest + Testing Library + jsdom** para testes. Os testes têm um tsconfig próprio (`tsconfig.test.json`), com tipos do Node, separado do código do app.

## Estrutura de pastas

```
src/
  app/          Rotas e layouts (LocaleLayout define o idioma da árvore)
  pages/        Uma página por rota: HomePage, ProjectPage, NotFoundPage
  sections/     Seções da página principal (Hero, Projects, About...) e seus estilos
  components/   Peças reutilizáveis: Header, Footer, ProjectCard, SectionLink
  lib/          Utilitários sem React (assetUrl)
  i18n/         Idiomas, caminhos por idioma e acesso ao conteúdo
  content/      Textos do site, um diretório por idioma (pt/, en/)
  styles/       Tokens e estilos globais (ver identidade-visual.md)
  test/         Configuração e utilitários de teste
public/         Arquivos servidos sem processamento: favicon, admin/ (painel) e images/ (mídia do painel)
docs/           Esta documentação
```

## Rotas

| Português         | Inglês               | Página                                      |
| ----------------- | -------------------- | ------------------------------------------- |
| `/`               | `/en`                | Página principal                            |
| `/projetos/:slug` | `/en/projects/:slug` | Detalhe de projeto                          |
| qualquer outra    | `/en/*`              | Página não encontrada, no idioma do prefixo |

- O português é o idioma padrão e fica na raiz; o inglês usa o prefixo `/en`.
- Cada grupo de rotas é envolvido por um `LocaleLayout`, que fornece o idioma via contexto, ajusta `<html lang>` e renderiza o link "pular para o conteúdo".
- Um slug que não existe no conteúdo mostra a página não encontrada.
- Os caminhos são montados por `homePath` e `projectPath` em `src/i18n/locales.ts`; não escreva URLs fixas nos componentes.
- As âncoras da página principal (`#inicio`, `#projetos`, `#sobre`, `#experiencia`, `#competencias`, `#formacao`, `#contato`) usam os mesmos ids nos dois idiomas. Links para elas usam `SectionLink`, que funciona a partir de qualquer página.
- O `ScrollRestoration` do React Router rola até a âncora da URL e restaura a posição ao voltar.
- Arquivos de `public/` (fotos, currículo) são referenciados com `assetUrl`, que respeita o `base` do Vite.
- Títulos da aba usam o suporte nativo do React 19 a `<title>` dentro dos componentes.

## Pré-renderização

O `npm run build` gera o app e, em seguida, um HTML estático para cada página:

1. `vite build` gera o app do navegador em `dist/`.
2. `vite build --ssr src/entry-server.tsx` gera uma versão do app para Node em `dist-ssr/`.
3. `scripts/prerender.mjs` renderiza cada caminho de `sitePaths()` (página principal e os sete projetos, nos dois idiomas) e grava `dist/<caminho>/index.html` com o conteúdo, `<html lang>`, título, descrição, canonical, `hreflang` e Open Graph. Também gera `404.html`, `sitemap.xml` e `robots.txt`.

No navegador, `src/main.tsx` hidrata a página quando o HTML corresponde ao caminho atual (atributo `data-path` do `#root`); caso contrário, renderiza do zero. Ao navegar, `DocumentHead` atualiza título e descrição.

Os metadados de cada rota vêm de `getRouteHead` (`src/app/routeHead.ts`), a mesma função usada no servidor e no navegador. Componentes não declaram `<title>` nem `<meta>`.

## Publicação

O site é publicado no **GitHub Pages** pelo workflow `.github/workflows/ci.yml`:

- Em todo push e pull request, roda lint, formatação, verificação de tipos, testes e build.
- Só em push no branch `main`, o job de deploy publica `dist/` no Pages.
- O site fica em `https://eduardokipper.github.io/portfoly/`. O workflow define `BASE_PATH=/<repositório>/`, que vira o `base` do Vite e o `basename` do React Router (via `import.meta.env.BASE_URL`), e `SITE_URL`, usado nos links absolutos. Localmente o base continua `/`.
- Cada página tem seu próprio `index.html` e responde com status 200. Endereços inexistentes recebem o `404.html`, que mostra a página não encontrada no idioma da URL.
- Para testar o build de produção localmente: `BASE_PATH=/portfoly/ npm run build` e `BASE_PATH=/portfoly/ npm run preview`.

Configuração necessária uma vez no GitHub: em Settings → Pages, escolher "GitHub Actions" como fonte, e permitir o branch `main` no ambiente `github-pages`.

## Testes

- `src/app/routes.test.tsx`: rotas, seções, menu móvel, troca de idioma, cursos e contato.
- `src/app/accessibility.test.tsx`: axe-core nas páginas principais dos dois idiomas (o contraste fica a cargo de `src/styles/contrast.test.ts`, porque o jsdom não calcula estilos).
- `src/app/routeHead.test.ts`: metadados e lista de páginas pré-renderizadas.
- `src/i18n/content.test.ts`: schema e paridade do conteúdo entre idiomas.
- `src/content/adminConfig.test.ts`: sincronia entre o painel admin e o schema.
