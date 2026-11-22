import { Target } from 'lucide-react'

const initials = 'JD'
const pageNames = { overview: 'Overview', tasks: 'My tasks', calendar: 'Calendar', settings: 'Settings' }

export default function Header({ activePage }) {
  return (
    <header className="topbar">
      <div className="mobile-brand">
        <span className="brand-mark"><Target size={17} strokeWidth={2.4} /></span>
        <span>Focus<span className="brand-strong">Board</span></span>
      </div>
      <div className="breadcrumb">Workspace <span>/</span> <strong>{pageNames[activePage] ?? 'Overview'}</strong></div>
      <div className="topbar-actions">
        <div className="avatar top-avatar" aria-label="User profile">{initials}</div>
      </div>
    </header>
  )
}
