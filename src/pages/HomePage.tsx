import { useContent } from '../i18n/LocaleContext'

export function HomePage() {
  const { ui } = useContent()

  return (
    <>
      <title>{ui.meta.pageTitle}</title>
      <section aria-labelledby="inicio-titulo">
        <h1 id="inicio-titulo">
          {ui.home.name}
          <span className="hero-role">{ui.home.role}</span>
        </h1>
        <p>{ui.home.headline}</p>
      </section>
    </>
  )
}
