import { ProjectCard } from '../components/ProjectCard'
import { useContent } from '../i18n/LocaleContext'

export function Projects() {
  const { home, projects } = useContent()
  const featured = projects.items.filter((project) => project.featured)
  const others = projects.items.filter((project) => !project.featured)

  return (
    <section id="projetos" className="section section--surface" aria-labelledby="projetos-titulo">
      <div className="container stack-6">
        <header className="section-heading">
          <h2 id="projetos-titulo">{home.projects.title}</h2>
          <p className="muted">{home.projects.intro}</p>
        </header>
        <ul className="card-grid">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        {others.length > 0 && (
          <div className="stack-3">
            <h3>{home.projects.moreTitle}</h3>
            <ul className="card-grid card-grid--compact">
              {others.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} headingLevel="h4" showCover={false} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
