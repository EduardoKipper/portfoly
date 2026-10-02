import type { RouteObject } from 'react-router'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProjectPage } from '../pages/ProjectPage'
import { LocaleLayout } from './LocaleLayout'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LocaleLayout locale="pt" />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projetos/:slug', element: <ProjectPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/en',
    element: <LocaleLayout locale="en" />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects/:slug', element: <ProjectPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
