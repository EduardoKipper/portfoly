# Conteúdo e idiomas

**Regra:** nenhum texto visível fica fixo em componente. Todo texto vem dos arquivos em `src/content/` (e, a partir da etapa 5, do painel admin, que edita esses mesmos arquivos).

## Organização

```
src/content/
  pt/ui.json        Textos de interface e metadados em português
  pt/projects.json  Catálogo de projetos em português
  en/ui.json        Mesma estrutura, em inglês
  en/projects.json
```

Um diretório por idioma, com os mesmos nomes de arquivo. Esse formato corresponde ao modo `multiple_folders` de i18n do Decap CMS, que será o painel admin (ver [decisões](decisoes.md)).

## Como os componentes leem o conteúdo

```tsx
const { ui, projects } = useContent() // conteúdo do idioma da rota atual
const locale = useLocale() // 'pt' | 'en'
```

- O formato é tipado a partir dos arquivos em português (`src/i18n/content.ts`). Se o inglês tiver uma estrutura diferente, o TypeScript acusa erro.
- Textos com valores variáveis usam marcadores `{nome}` e a função `format`.

## Adicionando um texto

1. Adicione a chave em `src/content/pt/*.json`.
2. Adicione a mesma chave, traduzida, em `src/content/en/*.json`.
3. Use a chave no componente via `useContent()`.

Os testes de `src/i18n/content.test.ts` falham se as chaves diferirem entre idiomas, se algum texto estiver vazio ou se os slugs de projeto não coincidirem.

## Slugs

O slug de um projeto é o mesmo nos dois idiomas (o identificador definido na especificação). Apenas o segmento da rota muda: `projetos` em português e `projects` em inglês.

## Fidelidade

O conteúdo segue a especificação do projeto (`portfolio-spec.md`): não inventar métricas, cargos ou fatos, e omitir da interface campos opcionais sem conteúdo.
