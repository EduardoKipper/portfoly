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
- Rotas profundas dependem do `404.html` como fallback (ver [arquitetura](arquitetura.md#publicação)).
