export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const inProgress = tasks.filter((task) => task.status === 'In progress').length
  return {
    total: tasks.length,
    completed,
    inProgress,
    percent: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
  }
}

export function getVisibleTasks(tasks, { query = '', status = 'All tasks', priority = 'All priorities', reverse = false } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const visible = tasks.filter((task) => {
    const matchesQuery = task.title.toLocaleLowerCase().includes(normalizedQuery)
    const matchesStatus = status === 'All tasks' || task.status === status
    const matchesPriority = priority === 'All priorities' || task.priority === priority
    return matchesQuery && matchesStatus && matchesPriority
  })
  return reverse ? visible.reverse() : visible
}

export function readStoredTasks(storage, key, fallback) {
  try {
    const stored = storage.getItem(key)
    if (stored === null) return fallback
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function writeStoredTasks(storage, key, tasks) {
  try {
    storage.setItem(key, JSON.stringify(tasks))
    return true
  } catch {
    return false
  }
}
