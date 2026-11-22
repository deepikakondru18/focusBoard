import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const blankTask = { title: '', description: '', category: 'General', status: 'To do', priority: 'Medium', dueDate: '' }

export default function TaskForm({ task, onSave, onClose }) {
  const [values, setValues] = useState(task ? { ...blankTask, ...task } : blankTask)
  const [error, setError] = useState('')

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  const change = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const title = values.title.trim()
    if (!title) return setError('Add a task title to continue.')
    if (!values.status || !values.priority) return setError('Choose a status and priority.')
    onSave({ ...values, title, category: values.category || 'General', id: task?.id ?? `task-${Date.now()}` })
  }

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="task-dialog" role="dialog" aria-modal="true" aria-labelledby="form-heading">
        <div className="dialog-heading">
          <div><h2 id="form-heading">{task ? 'Edit task' : 'Create new task'}</h2><p>Add your task details to stay on top of your work.</p></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close form"><X size={19} /></button>
        </div>
        <form onSubmit={submit} noValidate>
          <label className="field full-field">Task title <span className="required">*</span><input autoFocus name="title" value={values.title} onChange={change} placeholder="e.g. Update pricing page" aria-describedby={error ? 'form-error' : undefined} /></label>
          <label className="field full-field">Description<textarea name="description" value={values.description} onChange={change} rows="3" placeholder="Add notes about this task..." /></label>
          <div className="field-grid">
            <label className="field">Status <span className="required">*</span><select name="status" value={values.status} onChange={change}><option>To do</option><option>In progress</option><option>Completed</option></select></label>
            <label className="field">Priority <span className="required">*</span><select name="priority" value={values.priority} onChange={change}><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label className="field field-date">Due date<input type="date" name="dueDate" value={values.dueDate} onChange={change} onInput={change} /></label>
          </div>
          {error && <p className="form-error" id="form-error" role="alert">{error}</p>}
          <div className="required-note">* Required fields</div>
          <div className="dialog-actions"><button className="button button-quiet" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{task ? 'Save changes' : 'Create task'}</button></div>
        </form>
      </section>
    </div>
  )
}
