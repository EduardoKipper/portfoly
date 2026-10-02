import { useEffect } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { DocumentHead } from './DocumentHead'
import { getContent } from '../i18n/content'
import { LocaleContext } from '../i18n/LocaleContext'
import { htmlLang, type Locale } from '../i18n/locales'

interface LocaleLayoutProps {
  locale: Locale
}

export function LocaleLayout({ locale }: LocaleLayoutProps) {
  const { site } = getContent(locale)

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale]
  }, [locale])

  return (
    <LocaleContext value={locale}>
      <a className="skip-link" href="#conteudo">
        {site.skipToContent}
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <DocumentHead />
    </LocaleContext>
  )
}
