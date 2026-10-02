import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { getRouteHead } from './routeHead'

/**
 * Atualiza título e descrição ao navegar no navegador. Na primeira carga eles já vêm
 * no HTML gerado por scripts/prerender.mjs, junto com canonical, hreflang e Open Graph.
 */
export function DocumentHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const head = getRouteHead(pathname)
    document.title = head.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', head.description)
  }, [pathname])

  return null
}
