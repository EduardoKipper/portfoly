import { Link, useParams } from 'react-router'
import { format } from '../i18n/content'
import { useContent, useLocale } from '../i18n/LocaleContext'
import { homePath } from '../i18n/locales'
import { NotFoundPage } from './NotFoundPage'

export function ProjectPage() {
  const { slug } = useParams()
  const locale = useLocale()
  const { ui, projects } = useContent()
  const project = projects.items.find((item) => item.slug === slug)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <article>
      <title>{format(ui.meta.projectPageTitle, { title: project.title })}</title>
      <Link to={{ pathname: homePath(locale), hash: '#projetos' }}>
        {ui.project.backToProjects}
      </Link>
      <h1>{project.title}</h1>
    </article>
  )
}
