import { useContent } from '../i18n/LocaleContext'

export function Experience() {
  const { experience } = useContent().home

  return (
    <section
      id="experiencia"
      className="section section--surface"
      aria-labelledby="experiencia-titulo"
    >
      <div className="container stack-6">
        <h2 id="experiencia-titulo">{experience.title}</h2>
        {experience.items.map((item) => (
          <article key={`${item.company}-${item.role}`} className="card experience">
            <header className="experience__header">
              <div>
                <h3>{item.role}</h3>
                <p className="experience__company">{item.company}</p>
              </div>
              <p className="meta">{item.period}</p>
            </header>
            <p className="muted">{item.summary}</p>
            <div className="split split--tight">
              <div className="stack-2">
                <h4>{item.highlightsTitle}</h4>
                <ul className="marker-list">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              {item.tools.length > 0 && (
                <div className="stack-2">
                  <h4>{item.toolsTitle}</h4>
                  <ul className="tag-list">
                    {item.tools.map((tool) => (
                      <li key={tool} className="tag">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
