import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { getContent } from '../i18n/content'
import { LocaleContext } from '../i18n/LocaleContext'
import { htmlLang, type Locale } from '../i18n/locales'

interface LocaleLayoutProps {
  locale: Locale
}

export function LocaleLayout({ locale }: LocaleLayoutProps) {
  const { ui } = getContent(locale)

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale]
  }, [locale])

  return (
    <LocaleContext value={locale}>
      <a className="skip-link" href="#conteudo">
        {ui.skipToContent}
      </a>
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
    </LocaleContext>
  )
}
