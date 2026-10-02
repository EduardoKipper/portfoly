import { useContent } from '../i18n/LocaleContext'
import { assetUrl } from '../lib/assetUrl'

export function Contact() {
  const { site, home } = useContent()
  const { contact } = home

  return (
    <section id="contato" className="section contact" aria-labelledby="contato-titulo">
      <div className="container stack-4">
        <h2 id="contato-titulo">{contact.title}</h2>
        <p className="lead">{contact.text}</p>
        <div className="contact__actions">
          <a href={`mailto:${contact.email}`} className="button button--primary">
            {contact.emailLabel}
          </a>
          {contact.links.map((link) => (
            <a key={link.url} href={link.url} className="button button--secondary">
              {link.label}
            </a>
          ))}
          {site.resume.file && (
            <a href={assetUrl(site.resume.file)} className="button button--secondary" download>
              {site.resume.label}
            </a>
          )}
        </div>
        <ul className="contact__details meta">
          <li>{contact.email}</li>
          <li>{contact.location}</li>
          <li>{contact.workModes}</li>
          {contact.targetRoles && <li>{contact.targetRoles}</li>}
        </ul>
      </div>
    </section>
  )
}
