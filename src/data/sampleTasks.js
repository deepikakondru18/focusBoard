const dateFromToday = (offset) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const sampleTasks = [
  { id: 'task-101', title: 'Design landing page', description: 'Website redesign - Due soon', category: 'Design', status: 'In progress', priority: 'High', dueDate: dateFromToday(0), progress: 62 },
  { id: 'task-102', title: 'Fix mobile navigation', description: 'Frontend sprint - UI polish', category: 'Development', status: 'In progress', priority: 'Medium', dueDate: dateFromToday(2), progress: 67 },
  { id: 'task-103', title: 'Review onboarding copy', description: 'Content updates - Approved', category: 'Content', status: 'Completed', priority: 'Low', dueDate: dateFromToday(-4), progress: 100 },
  { id: 'task-104', title: 'Prepare launch checklist', description: 'Confirm the final steps before release.', category: 'Planning', status: 'To do', priority: 'Low', dueDate: dateFromToday(1), progress: 0 },
  { id: 'task-105', title: 'Build pricing section', description: 'Finish the responsive plan comparison.', category: 'Development', status: 'In progress', priority: 'High', dueDate: dateFromToday(3), progress: 54 },
  { id: 'task-106', title: 'Export product screenshots', description: 'Collect the visuals for the launch page.', category: 'Design', status: 'Completed', priority: 'Medium', dueDate: dateFromToday(-1), progress: 100 },
  { id: 'task-107', title: 'Verify keyboard navigation', description: 'Check the main flows without a mouse.', category: 'Testing', status: 'Completed', priority: 'Medium', dueDate: dateFromToday(4), progress: 100 },
  { id: 'task-108', title: 'Prepare research summary', description: 'Share the key findings with the team.', category: 'Research', status: 'In progress', priority: 'Low', dueDate: dateFromToday(5), progress: 72 },
  { id: 'task-109', title: 'Review empty states', description: 'Polish messages for the no-results view.', category: 'Design', status: 'Completed', priority: 'Low', dueDate: dateFromToday(2), progress: 100 },
  { id: 'task-110', title: 'Update component tokens', description: 'Align shared colors and spacing values.', category: 'Development', status: 'In progress', priority: 'Medium', dueDate: dateFromToday(6), progress: 48 },
  { id: 'task-111', title: 'Test account settings', description: 'Run a final check on profile preferences.', category: 'Testing', status: 'Completed', priority: 'High', dueDate: dateFromToday(-2), progress: 100 },
  { id: 'task-112', title: 'Finalize release notes', description: 'Summarize the improvements in this build.', category: 'Content', status: 'To do', priority: 'Low', dueDate: dateFromToday(7), progress: 0 },
]
