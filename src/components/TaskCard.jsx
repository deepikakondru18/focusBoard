import { useState } from 'react'
import { CalendarDays, Check, MoreHorizontal } from 'lucide-react'

function formatDate(value) {
  if (!value) return 'No date'
  const date = new Date(`${value}T12:00:00`)
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date)
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleComplete = () => onStatusChange(task.id, task.status === 'Completed' ? 'To do' : 'Completed')
  const chooseStatus = (status) => {
    onStatusChange(task.id, status)
    setMenuOpen(false)
  }

  return (
    <article className={`task-row ${task.status === 'Completed' ? 'task-complete' : ''}`}>
      <button
        className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`}
        aria-label={task.status === 'Completed' ? `Mark ${task.title} not completed` : `Mark ${task.title} complete`}
        aria-pressed={task.status === 'Completed'}
        onClick={toggleComplete}
      >
        {task.status === 'Completed' && <Check size={13} />}
      </button>
      <div className="task-main">
        <div className="task-title-line"><h3>{task.title}</h3></div>
        <p>{task.description || 'No description added.'}</p>
      </div>
      <div className="task-meta">
        <span className="category-chip">{task.category || 'General'}</span>
        <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        <span className="due-meta"><CalendarDays size={13} /> {formatDate(task.dueDate)}</span>
      </div>
      <div className="task-actions">
        <button
          className="icon-button row-action"
          aria-label={`Actions for ${task.title}`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MoreHorizontal size={17} />
        </button>
        {menuOpen && (
          <div className="action-menu" role="menu" aria-label={`Actions for ${task.title}`}>
            <button role="menuitem" onClick={() => { setMenuOpen(false); onEdit(task) }}>Edit task</button>
            <div className="action-menu-label">Change status</div>
            {['To do', 'In progress', 'Completed'].map((status) => (
              <button role="menuitemradio" aria-checked={task.status === status} key={status} onClick={() => chooseStatus(status)}>{status}</button>
            ))}
            <button className="danger-action" role="menuitem" onClick={() => { setMenuOpen(false); onDelete(task) }}>Delete task</button>
          </div>
        )}
      </div>
    </article>
  )
}
