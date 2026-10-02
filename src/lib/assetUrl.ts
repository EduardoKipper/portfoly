/** Caminho de um arquivo em public/, respeitando o `base` do Vite (ex.: /portfoly/ no GitHub Pages). */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
