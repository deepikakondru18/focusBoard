import { Search } from 'lucide-react'
import TaskCard from './TaskCard'

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange, onClearFilters }) {
  if (!tasks.length) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <div className="empty-icon"><Search size={19} /></div>
          <h3>No tasks found</h3>
          <p>Try a different search or clear your filters to see your tasks.</p>
          <button className="button button-quiet" onClick={onClearFilters}>Clear filters</button>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
      ))}
    </div>
  )
}
