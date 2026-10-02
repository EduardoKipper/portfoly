import { z } from 'zod'

/*
 * Formato do conteúdo do site. É a fonte de verdade para os tipos usados pelos componentes
 * e para a validação feita nos testes. O painel admin (public/admin/config.yml) espelha
 * estes campos; ao mudar um, mude o outro.
 */

const text = z.string().trim().min(1)
const optionalText = text.optional()
const anchor = z.enum([
  'inicio',
  'projetos',
  'sobre',
  'experiencia',
  'competencias',
  'formacao',
  'contato',
])
const url = z.url()
const optionalUrl = url.optional()
const sitePath = z.string().regex(/^\/[^\s]*$/, 'caminho deve começar com /')

const image = z.object({
  src: text,
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

const action = z.object({ label: text, anchor })

export const siteSchema = z.object({
  meta: z.object({
    pageTitle: text,
    description: text,
    projectPageTitle: text.regex(/\{title\}/, 'precisa conter {title}'),
  }),
  brand: z.object({ name: text, monogram: text }),
  skipToContent: text,
  navigation: z.object({
    label: text,
    items: z.array(z.object({ label: text, anchor })).min(1),
  }),
  header: z.object({
    openMenu: text,
    closeMenu: text,
    languageLabel: text,
    switchLanguage: text,
  }),
  resume: z.object({ label: text, file: sitePath.optional() }),
  project: z.object({
    backToProjects: text,
    contextTitle: text,
    roleTitle: text,
    solutionTitle: text,
    technologiesTitle: text,
    resultsTitle: text,
    teamSize: text.regex(/\{count\}/, 'precisa conter {count}'),
    linksTitle: text,
    repository: text,
    demo: text,
    nextProject: text,
    viewDetails: text,
  }),
  footer: z.object({ tagline: optionalText, backToTop: text, socialLabel: text }),
  notFound: z.object({ title: text, backHome: text }),
})

export const homeSchema = z.object({
  hero: z.object({
    role: text,
    headline: text,
    summary: text,
    location: text,
    stackLabel: text,
    stack: z.array(text).min(1),
    primaryAction: action,
    secondaryAction: action,
    photo: image.optional(),
  }),
  highlights: z.object({
    title: text,
    items: z.array(
      z.object({ value: text, label: text, context: text, projectSlug: text.optional() }),
    ),
  }),
  projects: z.object({ title: text, intro: text, moreTitle: text }),
  about: z.object({
    title: text,
    fullName: text,
    bio: text,
    location: text,
    approachTitle: text,
    workingApproach: z.array(text).min(1),
    languagesTitle: text,
    languages: z.array(text).min(1),
    photo: image.optional(),
  }),
  experience: z.object({
    title: text,
    items: z
      .array(
        z.object({
          company: text,
          role: text,
          period: text,
          summary: text,
          highlightsTitle: text,
          highlights: z.array(text).min(1),
          toolsTitle: text,
          tools: z.array(text),
        }),
      )
      .min(1),
  }),
  skills: z.object({
    title: text,
    groups: z.array(z.object({ title: text, level: optionalText, items: z.array(text).min(1) })),
  }),
  education: z.object({
    title: text,
    degrees: z.array(z.object({ degree: text, institution: text, period: text })),
    coursesTitle: text,
    courses: z.array(
      z.object({
        title: text,
        provider: text,
        hours: z.number().positive(),
        year: z.number().int(),
        certificateUrl: optionalUrl,
      }),
    ),
    hoursLabel: text.regex(/\{hours\}/, 'precisa conter {hours}'),
    initialCourses: z.number().int().positive(),
    showAllCourses: text,
    showFewerCourses: text,
  }),
  contact: z.object({
    title: text,
    text: text,
    emailLabel: text,
    email: z.email(),
    links: z.array(z.object({ label: text, url })),
    location: text,
    workModes: text,
    targetRoles: optionalText,
  }),
})

export const projectSchema = z.object({
  slug: text.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug em minúsculas separado por hífens'),
  title: text,
  category: text,
  featured: z.boolean(),
  summary: text,
  context: optionalText,
  role: text,
  teamSize: z.number().int().positive().optional(),
  solution: text,
  technologies: z.array(text).min(1),
  result: text,
  results: z.array(z.object({ value: text, label: text })),
  cover: image.optional(),
  repositoryUrl: optionalUrl,
  demoUrl: optionalUrl,
})

export const projectsSchema = z.object({
  items: z.array(projectSchema).min(1),
})

export type SiteContent = z.infer<typeof siteSchema>
export type HomeContent = z.infer<typeof homeSchema>
export type Project = z.infer<typeof projectSchema>
export type ProjectsContent = z.infer<typeof projectsSchema>
