import test from 'node:test'
import assert from 'node:assert/strict'
import { getTaskStats, getVisibleTasks, readStoredTasks, writeStoredTasks } from '../src/data/taskUtils.js'

const tasks = [
  { id: 'a', title: 'Design dashboard', status: 'In progress', priority: 'High' },
  { id: 'b', title: 'Review notes', status: 'To do', priority: 'High' },
  { id: 'c', title: 'Ship dashboard', status: 'Completed', priority: 'Low' },
]

test('statistics are derived from the current tasks and handle an empty list', () => {
  assert.deepEqual(getTaskStats(tasks), { total: 3, completed: 1, inProgress: 1, percent: 33 })
  assert.deepEqual(getTaskStats([]), { total: 0, completed: 0, inProgress: 0, percent: 0 })
})

test('search matches title case-insensitively and supports partial text', () => {
  assert.deepEqual(getVisibleTasks(tasks, { query: 'DASH' }).map(({ id }) => id), ['a', 'c'])
})

test('status and priority filters combine against the full task collection', () => {
  assert.deepEqual(getVisibleTasks(tasks, { status: 'In progress', priority: 'High' }).map(({ id }) => id), ['a'])
  assert.deepEqual(getVisibleTasks(tasks, { status: 'Completed', priority: 'High' }), [])
})

test('reversing order does not mutate the source task list', () => {
  assert.deepEqual(getVisibleTasks(tasks, { reverse: true }).map(({ id }) => id), ['c', 'b', 'a'])
  assert.deepEqual(tasks.map(({ id }) => id), ['a', 'b', 'c'])
})

test('storage restores a saved task array and uses the fallback for absent or invalid data', () => {
  const fallback = [{ id: 'fallback' }]
  const savedStorage = { getItem: () => JSON.stringify(tasks) }
  const emptyStorage = { getItem: () => null }
  const invalidStorage = { getItem: () => '{invalid' }
  const wrongShapeStorage = { getItem: () => JSON.stringify({ id: 'not-an-array' }) }
  assert.deepEqual(readStoredTasks(savedStorage, 'tasks', fallback), tasks)
  assert.deepEqual(readStoredTasks(emptyStorage, 'tasks', fallback), fallback)
  assert.deepEqual(readStoredTasks(invalidStorage, 'tasks', fallback), fallback)
  assert.deepEqual(readStoredTasks(wrongShapeStorage, 'tasks', fallback), fallback)
})

test('storage writes the complete task list and safely reports unavailable storage', () => {
  let stored
  const writableStorage = { setItem: (key, value) => { stored = [key, value] } }
  const unavailableStorage = { setItem: () => { throw new Error('Storage unavailable') } }
  assert.equal(writeStoredTasks(writableStorage, 'focusboard_tasks', tasks), true)
  assert.deepEqual(stored, ['focusboard_tasks', JSON.stringify(tasks)])
  assert.equal(writeStoredTasks(unavailableStorage, 'focusboard_tasks', tasks), false)
})
