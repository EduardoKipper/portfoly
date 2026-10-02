import enHome from '../content/en/home.json'
import enProjects from '../content/en/projects.json'
import enSite from '../content/en/site.json'
import ptHome from '../content/pt/home.json'
import ptProjects from '../content/pt/projects.json'
import ptSite from '../content/pt/site.json'
import type { HomeContent, Project, ProjectsContent, SiteContent } from '../content/schema'
import type { Locale } from './locales'

export interface LocaleContent {
  site: SiteContent
  home: HomeContent
  projects: ProjectsContent
}

// Os JSON são validados contra src/content/schema.ts nos testes (content.test.ts), que rodam
// no CI antes de todo build. Por isso aqui basta declarar o tipo, sem validar em tempo de execução.
const content: Record<Locale, LocaleContent> = {
  pt: {
    site: ptSite as SiteContent,
    home: ptHome as HomeContent,
    projects: ptProjects as ProjectsContent,
  },
  en: {
    site: enSite as SiteContent,
    home: enHome as HomeContent,
    projects: enProjects as ProjectsContent,
  },
}

export function getContent(locale: Locale): LocaleContent {
  return content[locale]
}

export function findProject(locale: Locale, slug: string | undefined): Project | undefined {
  return content[locale].projects.items.find((item) => item.slug === slug)
}

/** Substitui marcadores `{nome}` pelos valores informados. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}
