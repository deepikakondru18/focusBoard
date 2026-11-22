import { CalendarDays, LayoutDashboard, ListTodo, Settings2 } from 'lucide-react'

export default function MobileNav({ activePage, onOverview, onTasks, onCalendar, onSettings }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <button className={activePage === 'overview' ? 'mobile-nav-item active' : 'mobile-nav-item'} aria-current={activePage === 'overview' ? 'page' : undefined} onClick={onOverview}>
        <LayoutDashboard size={17} /><span>Overview</span>
      </button>
      <button className={activePage === 'tasks' ? 'mobile-nav-item active' : 'mobile-nav-item'} aria-current={activePage === 'tasks' ? 'page' : undefined} onClick={onTasks}>
        <ListTodo size={17} /><span>My tasks</span>
      </button>
      <button className={activePage === 'calendar' ? 'mobile-nav-item active' : 'mobile-nav-item'} aria-current={activePage === 'calendar' ? 'page' : undefined} onClick={onCalendar}>
        <CalendarDays size={17} /><span>Calendar</span>
      </button>
      <button className={activePage === 'settings' ? 'mobile-nav-item active' : 'mobile-nav-item'} aria-current={activePage === 'settings' ? 'page' : undefined} onClick={onSettings}>
        <Settings2 size={17} /><span>Settings</span>
      </button>
    </nav>
  )
}
