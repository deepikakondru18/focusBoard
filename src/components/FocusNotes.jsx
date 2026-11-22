import { useState } from 'react'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

const notes = [
  { label: 'A SMALL REMINDER', title: 'Make space for focus.', body: 'A clear next step can make a busy day feel lighter.', tone: 'lavender' },
  { label: 'TODAY’S INTENTION', title: 'Progress over perfect.', body: 'Give your attention to the work that matters right now.', tone: 'peach' },
  { label: 'A MOMENT TO RESET', title: 'You’re doing enough.', body: 'Pause, take a breath, and begin again when you’re ready.', tone: 'mint' },
]

export default function FocusNotes() {
  const [active, setActive] = useState(0)
  const move = (amount) => setActive((index) => (index + amount + notes.length) % notes.length)
  const note = notes[active]
  return (
    <section className={`focus-card ${note.tone}`} aria-label="Focus Notes">
      <div className="focus-top"><span><Sparkles size={15} /> FOCUS NOTES</span><span>{active + 1} <i>/</i> {notes.length}</span></div>
      <div className="focus-copy" aria-live="polite"><span className="eyebrow">{note.label}</span><h2>{note.title}</h2><p>{note.body}</p></div>
      <div className="focus-bottom"><div className="carousel-dots" aria-label="Choose a focus note">{notes.map((item, index) => <button key={item.label} className={index === active ? 'dot active' : 'dot'} aria-label={`Show note ${index + 1}`} aria-current={index === active ? 'true' : undefined} onClick={() => setActive(index)} />)}</div><div className="carousel-arrows"><button className="icon-button" aria-label="Previous note" onClick={() => move(-1)}><ArrowLeft size={17} /></button><button className="icon-button" aria-label="Next note" onClick={() => move(1)}><ArrowRight size={17} /></button></div></div>
    </section>
  )
}
