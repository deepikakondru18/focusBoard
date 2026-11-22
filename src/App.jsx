import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, CircleDashed, ListTodo, Plus } from 'lucide-react'
import FilterTabs from './components/FilterTabs'
import CalendarView from './components/CalendarView'
import FocusNotes from './components/FocusNotes'
import Header from './components/Header'
import MobileNav from './components/MobileNav'
import SearchBar from './components/SearchBar'
import SettingsView from './components/SettingsView'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { sampleTasks } from './data/sampleTasks'
import { getTaskStats, getVisibleTasks } from './data/taskUtils'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)
  const [settings, setSettings] = useLocalStorage('focusboard_settings', { firstDayOfWeek: 'Sunday', showCompletedInCalendar: true })
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All tasks')
  const [priority, setPriority] = useState('All')
  const [formTask, setFormTask] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteCandidate, setDeleteCandidate] = useState(null)
  const [activePage, setActivePage] = useState('overview')
  const searchInput = useRef(null)

  useEffect(() => {
    const focusSearch = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInput.current?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  const stats = useMemo(() => getTaskStats(tasks), [tasks])
  const filteredTasks = useMemo(
    () => getVisibleTasks(tasks, { query, status, priority }),
    [tasks, query, status, priority],
  )

  const openCreateForm = () => {
    setFormTask(null)
    setFormOpen(true)
  }

  const saveTask = (task) => {
    setTasks((current) => formTask
      ? current.map((item) => item.id === task.id ? task : item)
      : [task, ...current])
    setFormOpen(false)
    setFormTask(null)
  }

  const editTask = (task) => {
    setFormTask(task)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setFormTask(null)
  }

  const changeStatus = (id, nextStatus) => {
    setTasks((current) => current.map((task) => task.id === id ? {
      ...task,
      status: nextStatus,
      progress: nextStatus === 'Completed' ? 100 : nextStatus === 'To do' ? 0 : task.status === 'Completed' ? 67 : Math.min(task.progress ?? 1, 99),
    } : task))
  }

  const confirmDelete = () => {
    if (deleteCandidate) {
      setTasks((current) => current.filter((item) => item.id !== deleteCandidate.id))
    }
    setDeleteCandidate(null)
  }

  const resetFilters = () => {
    setQuery('')
    setStatus('All tasks')
    setPriority('All')
  }

  const showOverview = () => {
    setActivePage('overview')
    resetFilters()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showTasks = () => {
    setActivePage('tasks')
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById('tasks-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }))
  }

  const showPage = (page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onOverview={showOverview} onTasks={showTasks} onCalendar={() => showPage('calendar')} onSettings={() => showPage('settings')} />
      <main className="main-content">
        <Header activePage={activePage} />
        {activePage === 'calendar' ? (
          <div className="page-content"><CalendarView tasks={tasks} settings={settings} onEditTask={editTask} onCreateTask={openCreateForm} /></div>
        ) : activePage === 'settings' ? (
          <div className="page-content"><SettingsView settings={settings} onSettingsChange={setSettings} taskCount={tasks.length} /></div>
        ) : (
        <div className="page-content">
          <section className="welcome-row">
            <div>
              <h1>Your work, in focus.</h1>
              <p className="welcome-subtitle">Plan your day, stay organized, and celebrate small wins.</p>
            </div>
            <button className="button button-primary add-task-button" onClick={openCreateForm}>
              <Plus size={16} /> New task
            </button>
          </section>

          <FocusNotes tasks={tasks} />

          <section className="stats-grid" aria-label="Task overview">
            <StatCard icon={ListTodo} label="Total tasks" value={stats.total} note="Across all projects" color="purple" />
            <StatCard icon={CircleDashed} label="In progress" value={stats.inProgress} note="Keep the momentum" color="blue" />
            <StatCard icon={Check} label="Completed" value={stats.completed} note={`${stats.percent}% of tasks complete`} color="green" />
          </section>

          <section className="tasks-section" aria-labelledby="tasks-heading" id="tasks-section">
            <div className="section-heading">
              <div>
                <h2 id="tasks-heading">My tasks</h2>
                <p>Manage and track everything in one place.</p>
              </div>
              <button className="text-button" onClick={resetFilters}>View all tasks <span aria-hidden="true">→</span></button>
              <button className="button button-primary mobile-add-task" onClick={openCreateForm} aria-label="Create a new task">
                <Plus size={18} />
              </button>
            </div>

            <div className="task-toolbar">
              <FilterTabs tasks={tasks} status={status} onStatusChange={setStatus} />
              <div className="task-controls">
                <SearchBar inputRef={searchInput} query={query} onQueryChange={setQuery} />
                <label className="priority-select">
                  <span>Priority:</span>
                  <select aria-label="Filter by priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                    <option value="All">All</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </label>
              </div>
            </div>

            <TaskList
              tasks={filteredTasks}
              onEdit={editTask}
              onDelete={setDeleteCandidate}
              onStatusChange={changeStatus}
              onClearFilters={resetFilters}
            />
          </section>

          <footer className="page-footer">Take it one task at a time.</footer>
        </div>
        )}
      </main>

      <MobileNav activePage={activePage} onOverview={showOverview} onTasks={showTasks} onCalendar={() => showPage('calendar')} onSettings={() => showPage('settings')} />
      {formOpen && <TaskForm key={formTask?.id ?? 'new'} task={formTask} onSave={saveTask} onClose={closeForm} />}
      {deleteCandidate && (
        <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setDeleteCandidate(null)}>
          <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-heading" aria-describedby="delete-description">
            <div className="confirm-icon"><Check size={19} /></div>
            <h2 id="delete-heading">Delete this task?</h2>
            <p id="delete-description"><strong>{deleteCandidate.title}</strong> will be removed from your task list. This can’t be undone.</p>
            <div className="dialog-actions">
              <button className="button button-quiet" onClick={() => setDeleteCandidate(null)}>Cancel</button>
              <button className="button button-danger" onClick={confirmDelete}>Delete task</button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
