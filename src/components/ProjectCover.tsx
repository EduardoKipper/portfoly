import type { Project } from '../content/schema'
import { assetUrl } from '../lib/assetUrl'
import './ProjectCover.css'

/** Capa do projeto. Sem imagem, mostra um bloco gráfico abstrato que não simula interface. */
export function ProjectCover({ project }: { project: Project }) {
  if (project.cover) {
    return (
      <img
        className="project-cover"
        src={assetUrl(project.cover.src)}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        loading="lazy"
      />
    )
  }
  return <div className="project-cover project-cover--abstract" aria-hidden="true" />
}
