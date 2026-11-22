import { CalendarDays, LayoutDashboard, ListTodo, Settings2, Target } from 'lucide-react'

export default function Sidebar({ activePage, onOverview, onTasks, onCalendar, onSettings }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><Target size={19} strokeWidth={2.4} /></div>
        <span>Focus<span className="brand-strong">Board</span></span>
      </div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        <button className={`side-link ${activePage === 'overview' ? 'selected' : ''}`} onClick={onOverview}>
          <LayoutDashboard size={18} /> Overview
        </button>
        <button className={`side-link ${activePage === 'tasks' ? 'selected' : ''}`} onClick={onTasks}>
          <ListTodo size={18} /> My tasks
        </button>
        <button className={`side-link ${activePage === 'calendar' ? 'selected' : ''}`} aria-current={activePage === 'calendar' ? 'page' : undefined} onClick={onCalendar}>
          <CalendarDays size={18} /> Calendar
        </button>
        <button className={`side-link ${activePage === 'settings' ? 'selected' : ''}`} aria-current={activePage === 'settings' ? 'page' : undefined} onClick={onSettings}>
          <Settings2 size={18} /> Settings
        </button>
      </nav>
    </aside>
  )
}
