import { Clock3, LayoutDashboard, ListTodo, Sparkles, Target, X } from 'lucide-react'

const initials = 'AM'

export default function Sidebar({ active, onSelect, open, onClose }) {
  return (
    <>
      {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Target size={20} strokeWidth={2.4} /></div>
          <span>focus<span className="brand-strong">board</span></span>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <button className="side-link selected" onClick={() => { onSelect('All tasks'); onClose() }}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="side-link" onClick={() => { onSelect('All tasks'); onClose() }}>
            <ListTodo size={18} /> My tasks <span className="nav-count">{active.total}</span>
          </button>
          <button className="side-link" onClick={() => { onSelect('In progress'); onClose() }}>
            <Clock3 size={18} /> In progress
          </button>
        </nav>
        <div className="sidebar-spacer" />
        <div className="weekly-card">
          <span className="weekly-icon"><Sparkles size={16} /></span>
          <p>Small steps add up.</p>
          <span>{active.completed} of {active.total} tasks complete</span>
          <div className="weekly-track"><span style={{ width: `${active.percent}%` }} /></div>
        </div>
        <div className="profile-row">
          <div className="avatar">{initials}</div>
          <div className="profile-text"><strong>Alex Morgan</strong><span>Personal workspace</span></div>
        </div>
      </aside>
    </>
  )
}
