import { Link } from 'react-router'
import { useContent, useLocale } from '../i18n/LocaleContext'
import { homePath } from '../i18n/locales'

export function NotFoundPage() {
  const locale = useLocale()
  const { ui } = useContent()

  return (
    <section>
      <title>{ui.notFound.title}</title>
      <h1>{ui.notFound.title}</h1>
      <Link to={homePath(locale)}>{ui.notFound.backHome}</Link>
    </section>
  )
}
