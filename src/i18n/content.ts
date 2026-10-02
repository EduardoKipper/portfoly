import type { Locale } from './locales'
import enProjects from '../content/en/projects.json'
import enUi from '../content/en/ui.json'
import ptProjects from '../content/pt/projects.json'
import ptUi from '../content/pt/ui.json'

export type UiContent = typeof ptUi
export type ProjectsContent = typeof ptProjects

export interface SiteContent {
  ui: UiContent
  projects: ProjectsContent
}

// A anotação de tipo garante que o conteúdo em inglês tenha a mesma forma do português.
const content: Record<Locale, SiteContent> = {
  pt: { ui: ptUi, projects: ptProjects },
  en: { ui: enUi, projects: enProjects },
}

export function getContent(locale: Locale): SiteContent {
  return content[locale]
}

/** Substitui marcadores `{nome}` pelos valores informados. */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match)
}
