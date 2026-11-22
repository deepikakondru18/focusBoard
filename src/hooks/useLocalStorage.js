import { useEffect, useState } from 'react'
import { readStoredTasks, writeStoredTasks } from '../data/taskUtils'

export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => {
    return readStoredTasks(window.localStorage, key, fallback)
  })

  useEffect(() => {
    writeStoredTasks(window.localStorage, key, value)
  }, [key, value])

  return [value, setValue]
}
