import { Link } from 'react-router'
import { useContent, useLocale } from '../i18n/LocaleContext'
import { projectPath } from '../i18n/locales'

export function Highlights() {
  const locale = useLocale()
  const { home } = useContent()
  const { highlights } = home

  if (highlights.items.length === 0) return null

  return (
    <section className="highlights" aria-labelledby="destaques-titulo">
      <h2 id="destaques-titulo" className="visually-hidden">
        {highlights.title}
      </h2>
      <ul className="highlights__list">
        {highlights.items.map((item) => (
          <li key={item.value} className="card highlight">
            <p className="highlight__value">{item.value}</p>
            <p className="highlight__label">{item.label}</p>
            {item.projectSlug ? (
              <Link to={projectPath(locale, item.projectSlug)} className="meta highlight__context">
                {item.context}
              </Link>
            ) : (
              <p className="meta">{item.context}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
