import { CalendarDays, Check, SlidersHorizontal } from 'lucide-react'

export default function SettingsView({ settings, onSettingsChange, taskCount }) {
  const update = (changes) => onSettingsChange((current) => ({ ...current, ...changes }))

  return (
    <section className="workspace-page settings-page" aria-labelledby="settings-heading">
      <div className="page-title-row">
        <div><span className="eyebrow">MAKE IT YOURS</span><h1 id="settings-heading">Settings</h1><p>Adjust how FocusBoard organizes your day.</p></div>
        <span className="settings-title-icon"><SlidersHorizontal size={20} /></span>
      </div>
      <section className="settings-panel" aria-labelledby="calendar-preferences-heading">
        <div className="settings-panel-heading"><span className="settings-icon"><CalendarDays size={17} /></span><div><h2 id="calendar-preferences-heading">Calendar preferences</h2><p>Choose what you see in your task calendar.</p></div></div>
        <label className="setting-row" htmlFor="week-start">
          <span><strong>Week starts on</strong><small>Choose the first day shown in the calendar.</small></span>
          <select id="week-start" value={settings.firstDayOfWeek} onChange={(event) => update({ firstDayOfWeek: event.target.value })}><option>Sunday</option><option>Monday</option></select>
        </label>
        <div className="setting-row">
          <span><strong>Show completed tasks</strong><small>Keep finished work visible on the calendar.</small></span>
          <button className={`setting-toggle ${settings.showCompletedInCalendar ? 'on' : ''}`} role="switch" aria-checked={settings.showCompletedInCalendar} aria-label="Show completed tasks in calendar" onClick={() => update({ showCompletedInCalendar: !settings.showCompletedInCalendar })}><span /></button>
        </div>
      </section>
      <section className="settings-panel workspace-info" aria-labelledby="workspace-info-heading">
        <div className="settings-panel-heading"><span className="settings-icon"><Check size={17} /></span><div><h2 id="workspace-info-heading">Your workspace</h2><p>Your task data stays in this browser.</p></div></div>
        <div className="workspace-info-row"><span>Tasks in this workspace</span><strong>{taskCount}</strong></div>
        <div className="workspace-info-row"><span>Storage</span><strong>Saved on this device</strong></div>
      </section>
      <footer className="settings-saved"><Check size={14} /> Your preferences save automatically.</footer>
    </section>
  )
}
