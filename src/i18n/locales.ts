export const locales = ['pt', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'pt'

/** Valor do atributo `lang` do documento para cada idioma. */
export const htmlLang: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
}

/** Prefixo de URL de cada idioma. O idioma padrão fica na raiz. */
export const localePrefix: Record<Locale, string> = {
  pt: '',
  en: '/en',
}

/** Segmento da rota de detalhe de projeto em cada idioma. */
export const projectsSegment: Record<Locale, string> = {
  pt: 'projetos',
  en: 'projects',
}

export function homePath(locale: Locale): string {
  return localePrefix[locale] || '/'
}

export function projectPath(locale: Locale, slug: string): string {
  return `${localePrefix[locale]}/${projectsSegment[locale]}/${slug}`
}

/** Caminho equivalente da página atual em outro idioma. */
export function alternatePath(pathname: string, target: Locale): string {
  const enPrefix = localePrefix.en
  const isEnglish = pathname === enPrefix || pathname.startsWith(`${enPrefix}/`)
  const source: Locale = isEnglish ? 'en' : 'pt'
  const rest = isEnglish ? pathname.slice(enPrefix.length) : pathname

  const projectMatch = rest.match(new RegExp(`^/${projectsSegment[source]}/([^/]+)/?$`))
  if (projectMatch) return projectPath(target, projectMatch[1])
  if (rest === '' || rest === '/') return homePath(target)
  return `${localePrefix[target]}${rest}`
}
