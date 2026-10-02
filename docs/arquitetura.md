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
  i18n/         Idiomas, caminhos por idioma e acesso ao conteúdo
  content/      Textos do site, um diretório por idioma (pt/, en/)
  styles/       Tokens e estilos globais (ver identidade-visual.md)
  test/         Configuração e utilitários de teste
public/         Arquivos servidos sem processamento (favicon, futuramente /admin e o currículo)
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
- As âncoras da página principal (`#projetos`, `#sobre`...) usam os mesmos ids nos dois idiomas.
- Títulos da aba usam o suporte nativo do React 19 a `<title>` dentro dos componentes.

## Publicação

O site é publicado no **GitHub Pages** pelo workflow `.github/workflows/ci.yml`:

- Em todo push e pull request, roda lint, formatação, verificação de tipos, testes e build.
- Só em push no branch `main`, o job de deploy publica `dist/` no Pages.
- O site fica em `https://eduardokipper.github.io/portfoly/`. O workflow define `BASE_PATH=/<repositório>/`, que vira o `base` do Vite e o `basename` do React Router (via `import.meta.env.BASE_URL`). Localmente o base continua `/`.
- O Pages não tem fallback de SPA, então o workflow copia `index.html` para `404.html`. Rotas profundas como `/portfoly/en/projects/...` abrem o app normalmente, mas respondem com status HTTP 404; resolver isso (pré-renderização) fica para a etapa 6 do [roteiro](roteiro.md).
- Para testar o build de produção localmente: `BASE_PATH=/portfoly/ npm run build` e `BASE_PATH=/portfoly/ npm run preview`.

Configuração necessária uma vez no GitHub: em Settings → Pages, escolher "GitHub Actions" como fonte.
