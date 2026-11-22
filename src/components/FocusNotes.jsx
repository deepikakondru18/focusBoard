import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const notes = [
  { title: 'Make today count.', body: 'A little focus goes a long way.', taskTitle: 'Design landing page', progress: 62, previewLabel: 'NEXT UP' },
  { title: 'Small steps, big progress.', body: 'Keep your priorities in view.', taskTitle: 'Fix mobile navigation', progress: 67, previewLabel: 'IN PROGRESS' },
  { title: 'Celebrate the wins.', body: 'Every completed task moves you forward.', taskTitle: 'Review onboarding copy', progress: 100, previewLabel: 'COMPLETED' },
]

export default function FocusNotes({ tasks }) {
  const [active, setActive] = useState(0)
  const move = (amount) => setActive((index) => (index + amount + notes.length) % notes.length)
  const note = notes[active]
  const previewTask = tasks.find((task) => task.title === note.taskTitle)
  const progress = previewTask?.progress ?? note.progress
  const previewTitle = previewTask?.title ?? note.taskTitle

  return (
    <section className="focus-card" aria-label="Focus Notes carousel">
      <div className="focus-copy" aria-live="polite">
        <div className="focus-label">FOCUS NOTES <span>{String(active + 1).padStart(2, '0')} / 03</span></div>
        <h2>{note.title}</h2>
        <p>{note.body}</p>
        <div className="focus-indicators" aria-label="Choose a focus note">
          {notes.map((item, index) => (
            <button
              key={item.title}
              className={index === active ? 'focus-indicator active' : 'focus-indicator'}
              aria-label={`Show focus note ${index + 1}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
      <article className="focus-task-card" aria-label={`Featured task: ${previewTitle}`}>
        <div className="focus-task-copy">
          <span className="focus-task-state"><Check size={12} /> {note.previewLabel}</span>
          <strong>{previewTitle}</strong>
          <div className="focus-progress"><span style={{ width: `${progress}%` }} /></div>
          <span className="focus-progress-value">{progress}%</span>
        </div>
      </article>
      <div className="focus-mobile-progress" aria-label={`Featured task progress: ${progress}%`}>
        <span className="focus-mobile-progress-track"><span style={{ width: `${progress}%` }} /></span>
        <span>{progress}%</span>
      </div>
      <div className="carousel-arrows">
        <button className="icon-button" aria-label="Previous note" onClick={() => move(-1)}><ArrowLeft size={17} /></button>
        <button className="icon-button" aria-label="Next note" onClick={() => move(1)}><ArrowRight size={17} /></button>
      </div>
    </section>
  )
}
