import { useContent } from '../i18n/LocaleContext'
import { assetUrl } from '../lib/assetUrl'

export function About() {
  const { about } = useContent().home

  return (
    <section id="sobre" className="section" aria-labelledby="sobre-titulo">
      <div className="container split">
        <div className="stack-3">
          <h2 id="sobre-titulo">{about.title}</h2>
          <p className="lead">{about.bio}</p>
          <p className="meta">
            {about.fullName} · {about.location}
          </p>
        </div>
        <div className="stack-4">
          {about.photo && (
            <img
              className="about__photo"
              src={assetUrl(about.photo.src)}
              alt={about.photo.alt}
              width={about.photo.width}
              height={about.photo.height}
              loading="lazy"
            />
          )}
          <div className="stack-2">
            <h3>{about.approachTitle}</h3>
            <ul className="marker-list">
              {about.workingApproach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="stack-2">
            <h3>{about.languagesTitle}</h3>
            <ul className="marker-list">
              {about.languages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
