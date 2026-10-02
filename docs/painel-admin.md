# Painel admin

O conteúdo do site é editado pelo **Sveltia CMS**, um CMS baseado em Git e compatível com a configuração do Decap CMS. Ele roda inteiro no navegador e grava as alterações como commits no repositório. Não há servidor nem banco de dados.

## Como usar

1. Abra `https://eduardokipper.github.io/portfoly/admin/`.
2. Na primeira vez, crie um token no GitHub: Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
   - Repository access: _Only select repositories_ → `EduardoKipper/portfoly`.
   - Permissions → Repository permissions → **Contents: Read and write**.
3. No painel, escolha **Sign In Using Access Token** e cole o token. O navegador guarda a sessão.
4. Edite o conteúdo. Cada campo traduzível mostra as versões em português e inglês lado a lado.
5. Ao salvar, o painel cria um commit no branch `main`. O GitHub Actions valida o conteúdo, gera o site e publica em cerca de um minuto.

Se a validação falhar (por exemplo, um campo obrigatório vazio), o deploy não acontece e o site continua na versão anterior. O erro aparece na aba Actions do repositório.

## O que dá para editar

| Coleção          | Arquivo                             | Conteúdo                                                                     |
| ---------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| Página principal | `src/content/{pt,en}/home.json`     | Apresentação, destaques, sobre, experiência, competências, formação, contato |
| Projetos         | `src/content/{pt,en}/projects.json` | Catálogo de projetos e seus detalhes                                         |
| Textos gerais    | `src/content/{pt,en}/site.json`     | Metadados, menu, rótulos, rodapé, currículo e página 404                     |

Imagens e o PDF do currículo enviados pelo painel vão para `public/images/`.

Campos marcados como não traduzíveis (slug, URLs, números, imagens) são copiados automaticamente para o outro idioma.

## Configuração

- Página do painel: `public/admin/index.html`, que carrega o Sveltia CMS de uma versão fixa no unpkg. Para atualizar, troque a versão na URL do script.
- Campos: `public/admin/config.yml`. Ele espelha `src/content/schema.ts`; o teste `src/content/adminConfig.test.ts` falha se os dois divergirem.
- Os JSON de conteúdo ficam fora do Prettier (`.prettierignore`), porque o painel grava com a própria formatação.

## Por que Sveltia e não Decap

A decisão original (ver [decisões](decisoes.md)) era o Decap CMS. No GitHub Pages, o login do Decap exige um serviço OAuth externo. O Sveltia lê a mesma configuração, entra com token pessoal sem servidor e tem suporte melhor a idiomas.
