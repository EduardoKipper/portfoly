import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from './app/routes'
import './styles/index.css'

// BASE_URL vem do `base` do Vite (ex.: /portfoly/ no GitHub Pages).
const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

// Páginas pré-renderizadas trazem o HTML do próprio caminho (data-path) e são hidratadas.
// Em qualquer outro caso (404.html, servidor que devolve outra página) o app renderiza do zero.
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const currentPath = window.location.pathname.slice(basePath.length).replace(/(.)\/$/, '$1') || '/'

if (container.dataset.path === currentPath) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
