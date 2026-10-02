import { useContent } from '../i18n/LocaleContext'
import { SectionLink } from './SectionLink'
import './Footer.css'

const currentYear = new Date().getFullYear()

export function Footer() {
  const { site, home } = useContent()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__name">
            © {currentYear} {site.brand.name}
          </p>
          {site.footer.tagline && <p className="meta">{site.footer.tagline}</p>}
        </div>
        <nav aria-label={site.footer.socialLabel}>
          <ul className="site-footer__links">
            {home.contact.links.map((link) => (
              <li key={link.url}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
            <li>
              <SectionLink anchor="inicio">{site.footer.backToTop}</SectionLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
