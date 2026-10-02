// @vitest-environment node
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'
import type { z } from 'zod'
import { homeSchema, projectsSchema, siteSchema } from './schema'

interface ConfigField {
  name: string
  widget?: string
  fields?: ConfigField[]
  field?: ConfigField
}

interface ConfigFile {
  name: string
  file: string
  fields: ConfigField[]
}

const config = parse(
  readFileSync(new URL('../../public/admin/config.yml', import.meta.url), 'utf8'),
)
const files: ConfigFile[] = config.collections.flatMap(
  (collection: { files?: ConfigFile[] }) => collection.files ?? [],
)

/** Caminhos dos campos do painel, com `[]` para itens de lista. */
function configPaths(fields: ConfigField[], prefix = ''): string[] {
  return fields.flatMap((field) => {
    const path = prefix ? `${prefix}.${field.name}` : field.name
    if (field.widget === 'list' && field.fields)
      return [path, ...configPaths(field.fields, `${path}[]`)]
    if (field.widget === 'list') return [path]
    if (field.fields) return [path, ...configPaths(field.fields, path)]
    return [path]
  })
}

/** Caminhos do schema Zod no mesmo formato. Listas de valores simples não descem em `[]`. */
function schemaPaths(schema: z.ZodType, prefix = ''): string[] {
  const def = schema._zod.def as {
    type: string
    shape?: Record<string, z.ZodType>
    element?: z.ZodType
    innerType?: z.ZodType
  }
  if (def.type === 'optional') return schemaPaths(def.innerType!, prefix)
  if (def.type === 'object') {
    return Object.entries(def.shape!).flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key
      const childPaths = schemaPaths(child, path)
      return childPaths.includes(path) ? childPaths : [path, ...childPaths]
    })
  }
  if (def.type === 'array') {
    const inner = schemaPaths(def.element!, `${prefix}[]`)
    return [prefix, ...inner.filter((path) => path !== `${prefix}[]`)]
  }
  return [prefix]
}

const schemas: Record<string, z.ZodType> = {
  site: siteSchema,
  home: homeSchema,
  projects: projectsSchema,
}

describe('configuração do painel admin', () => {
  it.each(Object.keys(schemas))('tem os mesmos campos do schema em %s', (name) => {
    const file = files.find((item) => item.name === name)
    expect(file, `arquivo ${name} no config.yml`).toBeDefined()
    expect(file!.file).toBe(`src/content/{{locale}}/${name}.json`)
    expect(configPaths(file!.fields).sort()).toEqual(schemaPaths(schemas[name]).sort())
  })

  it('usa os idiomas do site', () => {
    expect(config.i18n.locales).toEqual(['pt', 'en'])
    expect(config.i18n.default_locale).toBe('pt')
  })
})
