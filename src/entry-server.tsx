import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from './app/routes'

export { getRouteHead, sitePaths } from './app/routeHead'
export { htmlLang } from './i18n/locales'

/** Basename do router sem barra final (ex.: /portfoly), ou / na raiz. */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

/** Renderiza a página de um caminho (sem o base) para HTML. Usado por scripts/prerender.mjs. */
export async function render(pathname: string): Promise<string> {
  const handler = createStaticHandler(routes, { basename })
  const url = new URL(`${basename === '/' ? '' : basename}${pathname}`, 'http://localhost')
  const context = await handler.query(new Request(url))
  if (context instanceof Response) {
    throw new Error(`Resposta inesperada ao renderizar ${pathname}`)
  }
  const router = createStaticRouter(handler.dataRoutes, context)
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </StrictMode>,
  )
}
