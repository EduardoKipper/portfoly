import { Link } from 'react-router'
import { useContent, useLocale } from '../i18n/LocaleContext'
import { homePath } from '../i18n/locales'

export function NotFoundPage() {
  const locale = useLocale()
  const { site } = useContent()

  return (
    <section className="section">
      <div className="container not-found">
        <h1>{site.notFound.title}</h1>
        <Link to={homePath(locale)} className="button button--primary">
          {site.notFound.backHome}
        </Link>
      </div>
    </section>
  )
}
