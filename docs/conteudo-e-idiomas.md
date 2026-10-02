# Conteúdo e idiomas

**Regra:** nenhum texto visível fica fixo em componente. Todo texto vem dos arquivos em `src/content/` (e, a partir da etapa 5, do painel admin, que edita esses mesmos arquivos).

## Organização

```
src/content/
  schema.ts         Formato de todo o conteúdo (Zod). Fonte de verdade dos tipos.
  pt/site.json      Textos gerais: metadados, menu, rótulos, rodapé, página 404
  pt/home.json      Seções da página principal: apresentação, destaques, sobre,
                    experiência, competências, formação e contato
  pt/projects.json  Catálogo de projetos (lista, na ordem de exibição)
  en/...            Mesmos arquivos, em inglês
```

Um diretório por idioma, com os mesmos nomes de arquivo. Esse formato corresponde ao modo `multiple_folders` de i18n do painel admin (ver [decisões](decisoes.md)).

## Como os componentes leem o conteúdo

```tsx
const { site, home, projects } = useContent() // conteúdo do idioma da rota atual
const locale = useLocale() // 'pt' | 'en'
```

- Os tipos vêm de `src/content/schema.ts` (`z.infer`). Os JSON são importados com esse tipo e validados contra o schema nos testes, que rodam no CI antes de todo build. Um conteúdo inválido, como texto vazio, URL malformada ou slug repetido, impede a publicação.
- Textos com valores variáveis usam marcadores `{nome}` e a função `format` (ex.: `"Equipe de {count} pessoas"`).
- Campos opcionais (foto, capa, links de repositório e demonstração, currículo, certificados) só aparecem na interface quando preenchidos. Nunca publique placeholders.

## Projetos

- `featured: true` coloca o projeto entre os destaques com capa; os demais aparecem em "Outros projetos".
- `results` lista métricas (valor e rótulo); `result` é a frase de resultado sempre exibida no detalhe.
- Sem `cover`, o card mostra um bloco gráfico abstrato.

## Adicionando um texto

1. Declare o campo em `src/content/schema.ts` (e no painel admin, em `public/admin/config.yml`).
2. Adicione a chave em `src/content/pt/*.json`.
3. Adicione a mesma chave, traduzida, em `src/content/en/*.json`.
4. Use a chave no componente via `useContent()`.

Os testes de `src/i18n/content.test.ts` falham se algum arquivo não seguir o schema, se as chaves diferirem entre idiomas ou se os slugs de projeto não coincidirem.

## Slugs

O slug de um projeto é o mesmo nos dois idiomas (o identificador definido na especificação). Apenas o segmento da rota muda: `projetos` em português e `projects` em inglês. A troca de idioma (`alternatePath`) mantém a página atual.

Os nomes dos cursos da Alura ficam em português também na versão em inglês, porque são títulos oficiais; a seção avisa que os cursos são em português.

## Fidelidade

O conteúdo segue a especificação do projeto (`portfolio-spec.md`): não inventar métricas, cargos ou fatos, e omitir da interface campos opcionais sem conteúdo.
