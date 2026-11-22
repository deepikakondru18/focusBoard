const dateFromToday = (offset) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const sampleTasks = [
  { id: 'task-101', title: 'Finalize portfolio case study', description: 'Polish the story and add final product screenshots.', category: 'Design', status: 'In progress', priority: 'High', dueDate: dateFromToday(1) },
  { id: 'task-102', title: 'Review mobile onboarding flow', description: 'Check the latest prototype on smaller screens.', category: 'Research', status: 'To do', priority: 'Medium', dueDate: dateFromToday(2) },
  { id: 'task-103', title: 'Prepare weekly team update', description: 'Share progress, decisions, and next steps.', category: 'Planning', status: 'Completed', priority: 'Low', dueDate: dateFromToday(-1) },
  { id: 'task-104', title: 'Build task card component', description: 'Add keyboard-friendly actions and status treatment.', category: 'Development', status: 'In progress', priority: 'High', dueDate: dateFromToday(3) },
  { id: 'task-105', title: 'Gather user interview notes', description: 'Group feedback into recurring themes.', category: 'Research', status: 'To do', priority: 'Medium', dueDate: dateFromToday(5) },
  { id: 'task-106', title: 'Test dashboard empty states', description: 'Verify first-run and no-results experiences.', category: 'Testing', status: 'Completed', priority: 'Low', dueDate: dateFromToday(-2) },
]
