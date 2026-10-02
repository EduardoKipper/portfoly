import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useContent, useLocale } from '../i18n/LocaleContext'
import { homePath } from '../i18n/locales'
import { assetUrl } from '../lib/assetUrl'
import { LanguageSwitch } from './LanguageSwitch'
import { SectionLink } from './SectionLink'
import './Header.css'

export function Header() {
  const locale = useLocale()
  const { site } = useContent()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to={homePath(locale)} className="site-header__brand" onClick={closeMenu}>
          <span aria-hidden="true" className="site-header__monogram">
            {site.brand.monogram}
          </span>
          <span className="site-header__name">{site.brand.name}</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-header__toggle-icon" aria-hidden="true" />
          <span className="visually-hidden">
            {menuOpen ? site.header.closeMenu : site.header.openMenu}
          </span>
        </button>

        <div id={menuId} className="site-header__menu" data-open={menuOpen}>
          <nav aria-label={site.navigation.label}>
            <ul className="site-header__nav">
              {site.navigation.items.map((item) => (
                <li key={item.anchor}>
                  <SectionLink anchor={item.anchor} onClick={closeMenu}>
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-header__actions">
            <LanguageSwitch onChange={closeMenu} />
            {site.resume.file && (
              <a href={assetUrl(site.resume.file)} className="button button--secondary" download>
                {site.resume.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
