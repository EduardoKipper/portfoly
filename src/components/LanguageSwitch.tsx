import { useRef, useState, type PointerEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useContent, useLocale } from '../i18n/LocaleContext'
import { alternatePath } from '../i18n/locales'
import { BrazilFlag, UsaFlag } from './Flags'
import './LanguageSwitch.css'

/** Distância mínima, em px, para um gesto contar como arraste em vez de clique. */
const DRAG_THRESHOLD = 4

interface LanguageSwitchProps {
  onChange?: () => void
}

/**
 * Switch PT/EN: desligado = português, ligado = inglês. Muda de idioma com clique, toque,
 * teclado (Espaço/Enter) ou arrastando o seletor até a outra bandeira.
 */
export function LanguageSwitch({ onChange }: LanguageSwitchProps) {
  const locale = useLocale()
  const { site } = useContent()
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()
  const isEnglish = locale === 'en'

  const trackRef = useRef<HTMLButtonElement>(null)
  const drag = useRef<{ startX: number; moved: boolean; travel: number } | null>(null)
  const suppressClick = useRef(false)
  const [offset, setOffset] = useState<number | null>(null)

  function switchTo(english: boolean) {
    if (english === isEnglish) return
    onChange?.()
    navigate({ pathname: alternatePath(pathname, english ? 'en' : 'pt'), hash })
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    const track = trackRef.current
    const thumb = track?.querySelector<HTMLElement>('.language-switch__thumb')
    if (!track || !thumb) return
    const travel = track.clientWidth - thumb.offsetWidth - 2 * thumb.offsetLeft
    drag.current = { startX: event.clientX, moved: false, travel }
    track.setPointerCapture?.(event.pointerId)
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    const state = drag.current
    if (!state) return
    const delta = event.clientX - state.startX
    if (!state.moved && Math.abs(delta) < DRAG_THRESHOLD) return
    state.moved = true
    const start = isEnglish ? state.travel : 0
    setOffset(Math.min(Math.max(start + delta, 0), state.travel))
  }

  function onPointerUp() {
    const state = drag.current
    drag.current = null
    if (!state?.moved) return
    // Depois de um arraste, o clique que o navegador dispara em seguida é ignorado.
    suppressClick.current = true
    const position = offset ?? (isEnglish ? state.travel : 0)
    setOffset(null)
    switchTo(position > state.travel / 2)
  }

  function onClick() {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    switchTo(!isEnglish)
  }

  return (
    <button
      ref={trackRef}
      type="button"
      role="switch"
      aria-checked={isEnglish}
      aria-label={site.header.englishVersion}
      title={site.header.englishVersion}
      className="language-switch"
      data-dragging={offset !== null}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        drag.current = null
        setOffset(null)
      }}
    >
      <span className="language-switch__flag language-switch__flag--pt">
        <BrazilFlag />
      </span>
      <span className="language-switch__flag language-switch__flag--en">
        <UsaFlag />
      </span>
      <span
        className="language-switch__thumb"
        aria-hidden="true"
        style={offset !== null ? { transform: `translateX(${offset}px)` } : undefined}
      />
    </button>
  )
}
