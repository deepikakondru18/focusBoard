const statuses = ['All tasks', 'To do', 'In progress', 'Completed']

export default function FilterTabs({ tasks, status, onStatusChange }) {
  return (
    <div className="task-tabs" role="tablist" aria-label="Filter by status">
      {statuses.map((item) => (
        <button
          role="tab"
          aria-selected={status === item}
          className={status === item ? 'task-tab active' : 'task-tab'}
          key={item}
          onClick={() => onStatusChange(item)}
        >
          {item}
          <span>{item === 'All tasks' ? tasks.length : tasks.filter((task) => task.status === item).length}</span>
        </button>
      ))}
    </div>
  )
}
