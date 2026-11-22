import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDownUp, CalendarDays, Check, ChevronDown, Clock3, LayoutDashboard, ListTodo, Menu, Pencil, Plus, Search, SlidersHorizontal, Sparkles, Target, Trash2, X } from 'lucide-react'
import FocusNotes from './components/FocusNotes'
import TaskForm from './components/TaskForm'
import { sampleTasks } from './data/sampleTasks'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getTaskStats, getVisibleTasks } from './data/taskUtils'
import './App.css'

const statuses = ['All tasks', 'To do', 'In progress', 'Completed']
const initials = 'AM'
const todayLabel = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toLocaleUpperCase()

function formatDate(value) {
  if (!value) return 'No date'
  const date = new Date(`${value}T12:00:00`)
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date)
}

function Sidebar({ active, onSelect, open, onClose }) {
  return <>
    {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Target size={20} strokeWidth={2.4} /></div><span>focus<span className="brand-strong">board</span></span><button className="icon-button sidebar-close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        <button className="side-link selected" onClick={() => { onSelect('All tasks'); onClose() }}><LayoutDashboard size={18} /> Dashboard</button>
        <button className="side-link" onClick={() => { onSelect('All tasks'); onClose() }}><ListTodo size={18} /> My tasks <span className="nav-count">{active.total}</span></button>
        <button className="side-link" onClick={() => { onSelect('In progress'); onClose() }}><Clock3 size={18} /> In progress</button>
      </nav>
      <div className="sidebar-spacer" />
      <div className="weekly-card"><span className="weekly-icon"><Sparkles size={16} /></span><p>Small steps add up.</p><span>{active.completed} of {active.total} tasks complete</span><div className="weekly-track"><span style={{ width: `${active.percent}%` }} /></div></div>
      <div className="profile-row"><div className="avatar">{initials}</div><div className="profile-text"><strong>Alex Morgan</strong><span>Personal workspace</span></div></div>
    </aside>
  </>
}

function StatCard({ icon: Icon, label, value, note, color }) {
  return <article className="stat-card"><div className={`stat-icon ${color}`}><Icon size={18} /></div><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><span className="stat-note">{note}</span></article>
}

function TaskRow({ task, onEdit, onDelete, onStatus }) {
  return <article className={`task-row ${task.status === 'Completed' ? 'task-complete' : ''}`}>
    <div className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`} aria-hidden="true">{task.status === 'Completed' && <Check size={13} />}</div>
    <div className="task-main"><div className="task-title-line"><h3>{task.title}</h3><span className={`priority-dot priority-${task.priority.toLowerCase()}`} title={`${task.priority} priority`} /></div><p>{task.description || 'No description added.'}</p><div className="task-meta"><span className="category-chip">{task.category || 'General'}</span><span className="due-meta"><CalendarDays size={13} /> {formatDate(task.dueDate)}</span></div></div>
    <label className={`status-pill status-${task.status.toLowerCase().replace(' ', '-')}`}><span className="status-dot" /><span className="visually-hidden">Status: </span><select aria-label={`Change status for ${task.title}`} value={task.status} onChange={(event) => onStatus(task.id, event.target.value)}><option>To do</option><option>In progress</option><option>Completed</option></select><ChevronDown size={13} /></label>
    <div className="task-actions"><button className="icon-button row-action" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}><Pencil size={15} /></button><button className="icon-button row-action delete-action" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}><Trash2 size={15} /></button></div>
  </article>
}

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
  const filteredTasks = useMemo(() => getVisibleTasks(tasks, { query, status, priority, reverse: sortNewest }), [tasks, query, status, priority, sortNewest])

  const saveTask = (task) => {
    setTasks((current) => formTask ? current.map((item) => item.id === task.id ? task : item) : [task, ...current])
    setFormOpen(false); setFormTask(null)
  }
  const editTask = (task) => { setFormTask(task); setFormOpen(true) }
  const closeForm = () => { setFormOpen(false); setFormTask(null) }
  const deleteTask = (task) => setDeleteCandidate(task)
  const confirmDelete = () => {
    if (deleteCandidate) setTasks((current) => current.filter((item) => item.id !== deleteCandidate.id))
    setDeleteCandidate(null)
  }
  const changeStatus = (id, nextStatus) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status: nextStatus } : task))
  const resetFilters = () => { setQuery(''); setStatus('All tasks'); setPriority('All priorities') }

  return <div className="app-shell">
    <Sidebar active={stats} onSelect={setStatus} open={mobileNav} onClose={() => setMobileNav(false)} />
    <main className="main-content">
      <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="breadcrumb">Workspace <span>/</span> <strong>Dashboard</strong></div><div className="topbar-actions"><span className="today-label"><Clock3 size={15} /> Your day, at a glance</span><div className="avatar top-avatar">{initials}</div></div></header>
      <div className="page-content">
        <section className="welcome-row"><div><div className="date-label">{todayLabel}</div><h1>Good morning, Alex <span className="wave">✳</span></h1><p className="welcome-subtitle">A little focus goes a long way. Here’s your day in view.</p></div><button className="button button-primary add-task-button" onClick={() => { setFormTask(null); setFormOpen(true) }}><Plus size={17} /> Add a task</button></section>

        <section className="stats-grid" aria-label="Task overview"><StatCard icon={ListTodo} label="Total tasks" value={stats.total} note="Across your workspace" color="purple" /><StatCard icon={Clock3} label="In progress" value={stats.inProgress} note="Keep the momentum" color="amber" /><StatCard icon={Check} label="Completed" value={stats.completed} note="Look at you go" color="green" /><article className="stat-card progress-stat"><div className="progress-ring" style={{ '--progress': `${stats.percent * 3.6}deg` }}><span>{stats.percent}<small>%</small></span></div><span className="stat-label">Completion</span><strong className="stat-value">{stats.percent}%</strong><span className="stat-note">You’re making progress</span></article></section>

        <div className="overview-grid"><FocusNotes /><aside className="daily-card"><div className="daily-art"><div className="sun-shape" /><div className="plant plant-one" /><div className="plant plant-two" /><div className="plant-pot" /></div><div className="daily-copy"><span className="eyebrow">YOUR DAILY PAUSE</span><h2>One thing at a time.</h2><p>You don’t have to do it all at once. Start with what feels right.</p></div></aside></div>

        <section className="tasks-section" aria-labelledby="tasks-heading"><div className="section-heading"><div><div className="eyebrow">YOUR WORK, GENTLY ORGANIZED</div><h2 id="tasks-heading">My tasks <span className="task-total">{stats.total}</span></h2></div><button className="text-button" onClick={() => { setStatus('All tasks'); setPriority('All priorities'); setQuery('') }}>View all <span aria-hidden="true">→</span></button></div>
          <div className="task-controls"><div className="search-box"><Search size={17} /><input ref={searchInput} aria-label="Search tasks by title" placeholder="Search tasks..." value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button className="clear-search" aria-label="Clear search" onClick={() => setQuery('')}><X size={15} /></button>}<kbd>Ctrl K</kbd></div><label className="priority-select"><SlidersHorizontal size={15} /><select aria-label="Filter by priority" value={priority} onChange={(event) => setPriority(event.target.value)}><option>All priorities</option><option>High</option><option>Medium</option><option>Low</option></select><ChevronDown size={14} /></label><button className={`sort-button ${sortNewest ? 'sort-active' : ''}`} aria-label="Reverse task order" onClick={() => setSortNewest((value) => !value)}><ArrowDownUp size={15} /></button></div>
          <div className="task-tabs" role="tablist" aria-label="Filter by status">{statuses.map((item) => <button role="tab" aria-selected={status === item} className={status === item ? 'task-tab active' : 'task-tab'} key={item} onClick={() => setStatus(item)}>{item}<span>{item === 'All tasks' ? tasks.length : tasks.filter((task) => task.status === item).length}</span></button>)}</div>
          <div className="task-list">{filteredTasks.length ? filteredTasks.map((task) => <TaskRow key={task.id} task={task} onEdit={editTask} onDelete={deleteTask} onStatus={changeStatus} />) : <div className="empty-state"><div className="empty-icon"><Search size={19} /></div><h3>No tasks found</h3><p>Try a different search or clear your filters to see your tasks.</p><button className="button button-quiet" onClick={resetFilters}>Clear filters</button></div>}</div>
          <div className="list-footer"><span>Showing <strong>{filteredTasks.length}</strong> of <strong>{tasks.length}</strong> tasks</span><button className="button button-quiet footer-add" onClick={() => { setFormTask(null); setFormOpen(true) }}><Plus size={15} /> Add task</button></div>
        </section>
        <footer className="page-footer"><span>Made for a little more focus <span className="footer-spark">✳</span></span><span>Take it one task at a time.</span></footer>
      </div>
    </main>
    {formOpen && <TaskForm key={formTask?.id ?? 'new'} task={formTask} onSave={saveTask} onClose={closeForm} />}
    {deleteCandidate && <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setDeleteCandidate(null)}><section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-heading" aria-describedby="delete-description"><div className="confirm-icon"><Trash2 size={19} /></div><h2 id="delete-heading">Delete this task?</h2><p id="delete-description"><strong>{deleteCandidate.title}</strong> will be removed from your task list. This can’t be undone.</p><div className="dialog-actions"><button className="button button-quiet" onClick={() => setDeleteCandidate(null)}>Cancel</button><button className="button button-danger" onClick={confirmDelete}>Delete task</button></div></section></div>}
  </div>
}

export default App
