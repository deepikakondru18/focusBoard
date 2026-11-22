export default function StatCard({ icon: Icon, label, value, note, color }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${color}`}><Icon size={18} /></div>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-note">{note}</span>
    </article>
  )
}
