import { createContext, useContext } from 'react'
import { getContent, type LocaleContent } from './content'
import { defaultLocale, type Locale } from './locales'

export const LocaleContext = createContext<Locale>(defaultLocale)

export function useLocale(): Locale {
  return useContext(LocaleContext)
}

export function useContent(): LocaleContent {
  return getContent(useLocale())
}
