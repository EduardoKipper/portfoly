import { SectionLink } from '../components/SectionLink'
import { useContent } from '../i18n/LocaleContext'
import { assetUrl } from '../lib/assetUrl'
import { Highlights } from './Highlights'

export function Hero() {
  const { site, home } = useContent()
  const { hero } = home

  return (
    <section id="inicio" className="section hero" aria-labelledby="inicio-titulo">
      <div className="container hero__grid">
        <div className="hero__text">
          <h1 id="inicio-titulo" className="hero__title">
            <span className="eyebrow hero__role">{hero.role}</span>
            <span className="hero__name">{site.brand.name}</span>
          </h1>
          <p className="hero__headline">{hero.headline}</p>
          <p className="muted">{hero.summary}</p>
          <p className="meta">{hero.location}</p>
          <ul className="tag-list" aria-label={hero.stackLabel}>
            {hero.stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
          <div className="hero__actions">
            <SectionLink anchor={hero.primaryAction.anchor} className="button button--primary">
              {hero.primaryAction.label}
            </SectionLink>
            <SectionLink anchor={hero.secondaryAction.anchor} className="button button--ghost">
              {hero.secondaryAction.label}
            </SectionLink>
          </div>
        </div>
        <div className="hero__aside">
          {hero.photo && (
            <img
              className="hero__photo"
              src={assetUrl(hero.photo.src)}
              alt={hero.photo.alt}
              width={hero.photo.width}
              height={hero.photo.height}
            />
          )}
          <Highlights />
        </div>
      </div>
    </section>
  )
}
