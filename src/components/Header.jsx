import { Clock3, Menu } from 'lucide-react'

const initials = 'AM'

export default function Header({ onOpenNav }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onOpenNav} aria-label="Open navigation">
        <Menu size={21} />
      </button>
      <div className="breadcrumb">Workspace <span>/</span> <strong>Dashboard</strong></div>
      <div className="topbar-actions">
        <span className="today-label"><Clock3 size={15} /> Your day, at a glance</span>
        <div className="avatar top-avatar">{initials}</div>
      </div>
    </header>
  )
}
