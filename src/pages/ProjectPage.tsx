import { Link, useParams } from 'react-router'
import { ProjectCover } from '../components/ProjectCover'
import { SectionLink } from '../components/SectionLink'
import { findProject, format } from '../i18n/content'
import { useContent, useLocale } from '../i18n/LocaleContext'
import { projectPath } from '../i18n/locales'
import { NotFoundPage } from './NotFoundPage'

export function ProjectPage() {
  const { slug } = useParams()
  const locale = useLocale()
  const { site, projects } = useContent()
  const project = findProject(locale, slug)

  if (!project) {
    return <NotFoundPage />
  }

  const labels = site.project
  const index = projects.items.indexOf(project)
  const next = projects.items[(index + 1) % projects.items.length]
  const hasLinks = Boolean(project.repositoryUrl || project.demoUrl)

  return (
    <article className="section">
      <title>{format(site.meta.projectPageTitle, { title: project.title })}</title>
      <div className="container project-detail">
        <SectionLink anchor="projetos" className="project-detail__back">
          <span aria-hidden="true">←</span> {labels.backToProjects}
        </SectionLink>

        <header className="project-detail__header">
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>
        </header>

        {project.cover && <ProjectCover project={project} />}

        <div className="split">
          <div className="stack-6">
            {project.context && (
              <section className="stack-2" aria-labelledby="contexto">
                <h2 id="contexto">{labels.contextTitle}</h2>
                <p>{project.context}</p>
              </section>
            )}
            <section className="stack-2" aria-labelledby="contribuicao">
              <h2 id="contribuicao">{labels.roleTitle}</h2>
              <p>{project.role}</p>
              {project.teamSize && (
                <p className="meta">{format(labels.teamSize, { count: project.teamSize })}</p>
              )}
            </section>
            <section className="stack-2" aria-labelledby="solucao">
              <h2 id="solucao">{labels.solutionTitle}</h2>
              <p>{project.solution}</p>
            </section>
          </div>

          <div className="stack-6">
            <section className="stack-2" aria-labelledby="tecnologias">
              <h2 id="tecnologias">{labels.technologiesTitle}</h2>
              <ul className="tag-list">
                {project.technologies.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
            <section className="stack-2" aria-labelledby="resultados">
              <h2 id="resultados">{labels.resultsTitle}</h2>
              {project.results.length > 0 && (
                <ul className="project-detail__results">
                  {project.results.map((result) => (
                    <li key={result.value} className="card highlight">
                      <p className="highlight__value">{result.value}</p>
                      <p className="highlight__label">{result.label}</p>
                    </li>
                  ))}
                </ul>
              )}
              <p>{project.result}</p>
            </section>
            {hasLinks && (
              <section className="stack-2" aria-labelledby="links">
                <h2 id="links">{labels.linksTitle}</h2>
                <div className="contact__actions">
                  {project.repositoryUrl && (
                    <a href={project.repositoryUrl} className="button button--secondary">
                      {labels.repository}
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} className="button button--primary">
                      {labels.demo}
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        {next && next !== project && (
          <nav className="project-detail__next" aria-label={labels.nextProject}>
            <p className="meta">{labels.nextProject}</p>
            <Link to={projectPath(locale, next.slug)}>
              {next.title} <span aria-hidden="true">→</span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  )
}
