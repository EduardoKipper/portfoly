import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'
import { useContent } from '../i18n/LocaleContext'

export function HomePage() {
  const { site } = useContent()

  return (
    <>
      <title>{site.meta.pageTitle}</title>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  )
}
