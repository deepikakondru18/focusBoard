import { Search, X } from 'lucide-react'

export default function SearchBar({ inputRef, query, onQueryChange }) {
  return (
    <div className="search-box">
      <Search size={17} />
      <input
        ref={inputRef}
        aria-label="Search tasks by title"
        placeholder="Find a task..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {query && (
        <button className="clear-search" aria-label="Clear search" onClick={() => onQueryChange('')}>
          <X size={15} />
        </button>
      )}
    </div>
  )
}
