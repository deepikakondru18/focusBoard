import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Plus } from 'lucide-react'

const dateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarView({ tasks, settings, onEditTask, onCreateTask }) {
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [today] = useState(() => dateKey(new Date()))
  const firstDay = settings.firstDayOfWeek === 'Monday' ? 1 : 0
  const monthLabel = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(month)
  const weekdays = useMemo(() => weekdayNames.map((_, index) => weekdayNames[(index + firstDay) % 7]), [firstDay])
  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const offset = (first.getDay() - firstDay + 7) % 7
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const cellCount = Math.ceil((offset + count) / 7) * 7
    return Array.from({ length: cellCount }, (_, index) => {
      const date = new Date(month.getFullYear(), month.getMonth(), index - offset + 1)
      return { date, key: dateKey(date), inMonth: date.getMonth() === month.getMonth() }
    })
  }, [firstDay, month])
  const tasksByDate = useMemo(() => {
    const grouped = new Map()
    tasks.forEach((task) => {
      if (!task.dueDate || (!settings.showCompletedInCalendar && task.status === 'Completed')) return
      grouped.set(task.dueDate, [...(grouped.get(task.dueDate) ?? []), task])
    })
    return grouped
  }, [settings.showCompletedInCalendar, tasks])
  const monthTasks = days.flatMap((day) => day.inMonth ? tasksByDate.get(day.key) ?? [] : [])

  return (
    <section className="workspace-page" aria-labelledby="calendar-heading">
      <div className="page-title-row">
        <div><span className="eyebrow">STAY ON TRACK</span><h1 id="calendar-heading">Calendar</h1><p>See what’s coming up across your tasks.</p></div>
        <button className="button button-primary" onClick={onCreateTask}><Plus size={16} /> New task</button>
      </div>
      <section className="calendar-panel" aria-label={`${monthLabel} task calendar`}>
        <div className="calendar-toolbar">
          <div><h2>{monthLabel}</h2><p>{monthTasks.length} task{monthTasks.length === 1 ? '' : 's'} due this month</p></div>
          <div className="calendar-nav">
            <button className="icon-button calendar-nav-button" aria-label="Previous month" onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}><ArrowLeft size={16} /></button>
            <button className="button button-quiet calendar-today" onClick={() => setMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}>Today</button>
            <button className="icon-button calendar-nav-button" aria-label="Next month" onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}><ArrowRight size={16} /></button>
          </div>
        </div>
        <div className="calendar-grid" role="grid" aria-label={monthLabel}>
          {weekdays.map((day) => <div className="calendar-weekday" role="columnheader" key={day}>{day}</div>)}
          {days.map(({ date, key, inMonth }) => {
            const dayTasks = tasksByDate.get(key) ?? []
            return (
              <div className={`calendar-day ${inMonth ? '' : 'outside-month'} ${key === today ? 'today' : ''}`} role="gridcell" aria-label={`${new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)}${key === today ? ', today' : ''}`} key={key}>
                <span className="calendar-day-number">{date.getDate()}</span>
                <div className="calendar-day-tasks">
                  {dayTasks.slice(0, 3).map((task) => (
                    <button key={task.id} className={`calendar-task calendar-task-${task.status.toLowerCase().replaceAll(' ', '-')}`} title={`${task.title} · ${task.status}`} onClick={() => onEditTask(task)}>
                      <span>{task.title}</span>
                    </button>
                  ))}
                  {dayTasks.length > 3 && <span className="calendar-more">+{dayTasks.length - 3} more</span>}
                </div>
              </div>
            )
          })}
        </div>
        <p className="calendar-hint"><CalendarDays size={14} /> Select a task to edit its details.</p>
      </section>
      {monthTasks.length === 0 && <div className="calendar-empty">No tasks are due this month. Add a due date to see tasks here.</div>}
    </section>
  )
}
