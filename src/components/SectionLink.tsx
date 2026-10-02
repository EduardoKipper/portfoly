import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { HomeContent } from '../content/schema'
import { useLocale } from '../i18n/LocaleContext'
import { homePath } from '../i18n/locales'

type Anchor = HomeContent['hero']['primaryAction']['anchor']

interface SectionLinkProps {
  anchor: Anchor
  className?: string
  onClick?: () => void
  children: ReactNode
}

/** Link para uma seção da página principal, funcionando a partir de qualquer página. */
export function SectionLink({ anchor, className, onClick, children }: SectionLinkProps) {
  const locale = useLocale()
  return (
    <Link
      to={{ pathname: homePath(locale), hash: `#${anchor}` }}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
