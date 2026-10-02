# Decisões

## 001 · Site estático com Vite, React e TypeScript (02/10/2026)

O portfólio é uma SPA estática. Não há necessidade de servidor próprio: o conteúdo muda pouco e é publicado por build.

## 002 · Idiomas por prefixo de URL (02/10/2026)

Português na raiz e inglês em `/en`, com o segmento da rota de projeto traduzido. Cada idioma tem URL própria, o que permite compartilhar links e indexar as duas versões.

## 003 · Painel admin com Decap CMS via Git (02/10/2026)

Escolhido pelo usuário entre Decap CMS, Supabase com admin próprio e adiar o admin.

- O painel fica em `/admin` e grava os arquivos de `src/content/` diretamente no repositório, com login pelo GitHub.
- Cada edição vira um commit, então há histórico e reversão; a publicação acontece no próximo build.
- Mantém o site estático e sem custo de backend.
- Substitui o trecho da especificação que dispensava painel administrativo na primeira versão.

## 004 · oxlint em vez de ESLint (02/10/2026)

O modelo atual do Vite já vem com oxlint, que é mais rápido e cobre as regras de React e TypeScript necessárias.

## 005 · Hospedagem no GitHub Pages via Actions (02/10/2026)

Pedido do usuário. Publicação gratuita a partir do próprio repositório, com deploy a cada push no `main`.

- Consequência para o painel admin (etapa 5): o Decap CMS com backend GitHub precisa de um serviço de autenticação OAuth, que o GitHub Pages não oferece. Será preciso um pequeno proxy OAuth externo (por exemplo, um Cloudflare Worker gratuito) ou mover a hospedagem para um serviço que já o forneça.
- Rotas profundas eram atendidas pelo `404.html`; desde a decisão 007, cada página tem HTML próprio.

## 006 · Sveltia CMS no lugar do Decap (02/10/2026)

O Sveltia CMS é o sucessor compatível do Decap: usa o mesmo formato de `config.yml`, também grava no repositório e permite login com token pessoal do GitHub. Isso elimina o serviço OAuth que o Decap exigiria no GitHub Pages (decisão 005). Detalhes de uso em [painel admin](painel-admin.md).

## 007 · Pré-renderização das páginas (02/10/2026)

Cada página é gerada como HTML estático no build e hidratada no navegador, sem framework adicional: um build SSR do Vite e um script (`scripts/prerender.mjs`). Assim cada endereço responde 200 no GitHub Pages, com título, descrição, canonical e `hreflang` próprios, o que melhora indexação e prévias de links nas duas línguas.
