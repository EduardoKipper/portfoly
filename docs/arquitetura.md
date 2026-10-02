# Arquitetura

## Stack

- **Vite + React 19 + TypeScript**: site estático (SPA), sem servidor próprio.
- **React Router** (modo de dados, `createBrowserRouter`): rotas por idioma.
- **oxlint** para lint e **Prettier** para formatação.
- **Vitest + Testing Library + jsdom** para testes.

## Estrutura de pastas

```
src/
  app/          Rotas e layouts (LocaleLayout define o idioma da árvore)
  pages/        Uma página por rota: HomePage, ProjectPage, NotFoundPage
  i18n/         Idiomas, caminhos por idioma e acesso ao conteúdo
  content/      Textos do site, um diretório por idioma (pt/, en/)
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

Por ser uma SPA, o servidor precisa devolver `index.html` para qualquer rota desconhecida (fallback). Isso será configurado junto com o deploy na etapa 6 do [roteiro](roteiro.md).
