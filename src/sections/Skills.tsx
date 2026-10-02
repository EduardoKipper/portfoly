import { useContent } from '../i18n/LocaleContext'

export function Skills() {
  const { skills } = useContent().home

  return (
    <section id="competencias" className="section" aria-labelledby="competencias-titulo">
      <div className="container stack-6">
        <h2 id="competencias-titulo">{skills.title}</h2>
        <ul className="card-grid card-grid--compact">
          {skills.groups.map((group) => (
            <li key={group.title}>
              <div className="card skill-group">
                <h3 className="skill-group__title">{group.title}</h3>
                {group.level && <p className="skill-group__level">{group.level}</p>}
                <ul className="tag-list">
                  {group.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
