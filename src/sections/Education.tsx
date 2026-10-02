import { useId, useState } from 'react'
import { format } from '../i18n/content'
import { useContent } from '../i18n/LocaleContext'

export function Education() {
  const { education } = useContent().home
  const [showAll, setShowAll] = useState(false)
  const listId = useId()
  const hasMore = education.courses.length > education.initialCourses
  const courses = showAll ? education.courses : education.courses.slice(0, education.initialCourses)

  return (
    <section id="formacao" className="section section--surface" aria-labelledby="formacao-titulo">
      <div className="container split">
        <div className="stack-3">
          <h2 id="formacao-titulo">{education.title}</h2>
          {education.degrees.map((degree) => (
            <div key={degree.degree} className="card degree">
              <h3>{degree.degree}</h3>
              <p className="muted">{degree.institution}</p>
              <p className="meta">{degree.period}</p>
            </div>
          ))}
        </div>
        <div className="stack-3">
          <h3>{education.coursesTitle}</h3>
          <ul id={listId} className="course-list">
            {courses.map((course) => (
              <li key={course.title} className="course">
                <p className="course__title">
                  {course.certificateUrl ? (
                    <a href={course.certificateUrl}>{course.title}</a>
                  ) : (
                    course.title
                  )}
                </p>
                <p className="meta">
                  {course.provider} · {format(education.hoursLabel, { hours: course.hours })} ·{' '}
                  {course.year}
                </p>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              type="button"
              className="button button--secondary course-list__toggle"
              aria-expanded={showAll}
              aria-controls={listId}
              onClick={() => setShowAll((value) => !value)}
            >
              {showAll ? education.showFewerCourses : education.showAllCourses}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
