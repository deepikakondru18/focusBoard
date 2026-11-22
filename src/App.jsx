import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDownUp, Check, ChevronDown, Clock3, ListTodo, Plus, SlidersHorizontal, Trash2 } from 'lucide-react'
import FilterTabs from './components/FilterTabs'
import FocusNotes from './components/FocusNotes'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { sampleTasks } from './data/sampleTasks'
import { getTaskStats, getVisibleTasks } from './data/taskUtils'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

const todayLabel = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
}).format(new Date()).toLocaleUpperCase()

function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All tasks')
  const [priority, setPriority] = useState('All priorities')
  const [formTask, setFormTask] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteCandidate, setDeleteCandidate] = useState(null)
  const [mobileNav, setMobileNav] = useState(false)
  const [sortNewest, setSortNewest] = useState(false)
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
    () => getVisibleTasks(tasks, { query, status, priority, reverse: sortNewest }),
    [tasks, query, status, priority, sortNewest],
  )

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

  const confirmDelete = () => {
    if (deleteCandidate) {
      setTasks((current) => current.filter((item) => item.id !== deleteCandidate.id))
    }
    setDeleteCandidate(null)
  }

  const changeStatus = (id, nextStatus) => {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, status: nextStatus } : task
    )))
  }

  const resetFilters = () => {
    setQuery('')
    setStatus('All tasks')
    setPriority('All priorities')
  }

  const openCreateForm = () => {
    setFormTask(null)
    setFormOpen(true)
  }

  return (
    <div className="app-shell">
      <Sidebar
        active={stats}
        onSelect={setStatus}
        open={mobileNav}
        onClose={() => setMobileNav(false)}
      />
      <main className="main-content">
        <Header onOpenNav={() => setMobileNav(true)} />
        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="date-label">{todayLabel}</div>
              <h1>Good morning, Alex <span className="wave">✳</span></h1>
              <p className="welcome-subtitle">A little focus goes a long way. Here’s your day in view.</p>
            </div>
            <button className="button button-primary add-task-button" onClick={openCreateForm}>
              <Plus size={17} /> Add a task
            </button>
          </section>

          <section className="stats-grid" aria-label="Task overview">
            <StatCard icon={ListTodo} label="Total tasks" value={stats.total} note="Across your workspace" color="purple" />
            <StatCard icon={Clock3} label="In progress" value={stats.inProgress} note="Keep the momentum" color="amber" />
            <StatCard icon={Check} label="Completed" value={stats.completed} note="Look at you go" color="green" />
            <article className="stat-card progress-stat">
              <div className="progress-ring" style={{ '--progress': `${stats.percent * 3.6}deg` }}>
                <span>{stats.percent}<small>%</small></span>
              </div>
              <span className="stat-label">Completion</span>
              <strong className="stat-value">{stats.percent}%</strong>
              <span className="stat-note">You’re making progress</span>
            </article>
          </section>

          <div className="overview-grid">
            <FocusNotes />
            <aside className="daily-card">
              <div className="daily-art">
                <div className="sun-shape" />
                <div className="plant plant-one" />
                <div className="plant plant-two" />
                <div className="plant-pot" />
              </div>
              <div className="daily-copy">
                <span className="eyebrow">YOUR DAILY PAUSE</span>
                <h2>One thing at a time.</h2>
                <p>You don’t have to do it all at once. Start with what feels right.</p>
              </div>
            </aside>
          </div>

          <section className="tasks-section" aria-labelledby="tasks-heading">
            <div className="section-heading">
              <div>
                <div className="eyebrow">YOUR WORK, GENTLY ORGANIZED</div>
                <h2 id="tasks-heading">My tasks <span className="task-total">{stats.total}</span></h2>
              </div>
              <button className="text-button" onClick={resetFilters}>View all <span aria-hidden="true">→</span></button>
            </div>

            <div className="task-controls">
              <SearchBar inputRef={searchInput} query={query} onQueryChange={setQuery} />
              <label className="priority-select">
                <SlidersHorizontal size={15} />
                <select aria-label="Filter by priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                  <option>All priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown size={14} />
              </label>
              <button
                className={`sort-button ${sortNewest ? 'sort-active' : ''}`}
                aria-label="Reverse task order"
                onClick={() => setSortNewest((value) => !value)}
              >
                <ArrowDownUp size={15} />
              </button>
            </div>

            <FilterTabs tasks={tasks} status={status} onStatusChange={setStatus} />
            <TaskList
              tasks={filteredTasks}
              onEdit={editTask}
              onDelete={setDeleteCandidate}
              onStatusChange={changeStatus}
              onClearFilters={resetFilters}
            />
            <div className="list-footer">
              <span>Showing <strong>{filteredTasks.length}</strong> of <strong>{tasks.length}</strong> tasks</span>
              <button className="button button-quiet footer-add" onClick={openCreateForm}><Plus size={15} /> Add task</button>
            </div>
          </section>

          <footer className="page-footer">
            <span>Made for a little more focus <span className="footer-spark">✳</span></span>
            <span>Take it one task at a time.</span>
          </footer>
        </div>
      </main>

      {formOpen && <TaskForm key={formTask?.id ?? 'new'} task={formTask} onSave={saveTask} onClose={closeForm} />}
      {deleteCandidate && (
        <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setDeleteCandidate(null)}>
          <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-heading" aria-describedby="delete-description">
            <div className="confirm-icon"><Trash2 size={19} /></div>
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
