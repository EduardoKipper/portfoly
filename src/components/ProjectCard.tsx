import { Link } from 'react-router'
import type { Project } from '../content/schema'
import { useContent, useLocale } from '../i18n/LocaleContext'
import { projectPath } from '../i18n/locales'
import { ProjectCover } from './ProjectCover'
import './ProjectCard.css'

interface ProjectCardProps {
  project: Project
  headingLevel?: 'h3' | 'h4'
  showCover?: boolean
}

export function ProjectCard({ project, headingLevel = 'h3', showCover = true }: ProjectCardProps) {
  const locale = useLocale()
  const { site } = useContent()
  const Heading = headingLevel

  return (
    <article className="card project-card">
      {showCover && <ProjectCover project={project} />}
      <div className="project-card__body">
        <p className="eyebrow">{project.category}</p>
        <Heading className="project-card__title">
          <Link to={projectPath(locale, project.slug)} className="project-card__link">
            {project.title}
          </Link>
        </Heading>
        <p className="muted">{project.summary}</p>
        {project.results.length > 0 && (
          <p className="project-card__result">{project.results[0].value}</p>
        )}
        <ul className="tag-list" aria-label={site.project.technologiesTitle}>
          {project.technologies.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
        <span className="project-card__cta" aria-hidden="true">
          {site.project.viewDetails} →
        </span>
      </div>
    </article>
  )
}
