import { CalendarDays, Check, ChevronDown, Pencil, Trash2 } from 'lucide-react'

function formatDate(value) {
  if (!value) return 'No date'
  const date = new Date(`${value}T12:00:00`)
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date)
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className={`task-row ${task.status === 'Completed' ? 'task-complete' : ''}`}>
      <div className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`} aria-hidden="true">
        {task.status === 'Completed' && <Check size={13} />}
      </div>
      <div className="task-main">
        <div className="task-title-line">
          <h3>{task.title}</h3>
          <span className={`priority-dot priority-${task.priority.toLowerCase()}`} title={`${task.priority} priority`} />
        </div>
        <p>{task.description || 'No description added.'}</p>
        <div className="task-meta">
          <span className="category-chip">{task.category || 'General'}</span>
          <span className="due-meta"><CalendarDays size={13} /> {formatDate(task.dueDate)}</span>
        </div>
      </div>
      <label className={`status-pill status-${task.status.toLowerCase().replace(' ', '-')}`}>
        <span className="status-dot" />
        <span className="visually-hidden">Status: </span>
        <select aria-label={`Change status for ${task.title}`} value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}>
          <option>To do</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
        <ChevronDown size={13} />
      </label>
      <div className="task-actions">
        <button className="icon-button row-action" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}><Pencil size={15} /></button>
        <button className="icon-button row-action delete-action" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}><Trash2 size={15} /></button>
      </div>
    </article>
  )
}
