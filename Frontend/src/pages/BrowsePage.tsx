import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { EmptyState } from "../components/EmptyState"
import { Icon } from "../components/Icon"
import { ProfessionalCard } from "../components/ProfessionalCard"
import { CATEGORIES, SUB_CITIES, type DiscoveryMode, type Professional } from "../data/catalog"
import { browseProfessionals } from "../data/api"

const RESULTS_PER_BATCH = 4

export function BrowsePage() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [results, setResults] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const query = params.get("q") ?? ""
  const category = params.get("category") ?? ""
  const area = params.get("area") ?? ""
  const mode: DiscoveryMode = params.get("mode") === "professionals" ? "professionals" : "services"
  const browseStateKey = JSON.stringify([query, mode, category, area])
  const [cursorState, setCursorState] = useState<{ key: string; history: (string | null)[] }>({
    key: browseStateKey,
    history: [null],
  })
  const cursorHistory = cursorState.key === browseStateKey ? cursorState.history : [null]

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(false)
    const requestParams = new URLSearchParams()
    if (query) requestParams.set("q", query)
    if (mode === "professionals") requestParams.set("mode", mode)
    if (category) requestParams.set("category", category)
    if (area) requestParams.set("area", area)
    browseProfessionals(requestParams)
      .then((items) => { if (active) setResults(items) })
      .catch(() => { if (active) setError(true) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [query, mode, category, area])
  const cursor = cursorHistory[cursorHistory.length - 1]
  const startIndex = cursor
    ? Math.max(0, results.findIndex((professional) => professional.id === cursor) + 1)
    : 0
  const visibleProfessionals = results.slice(startIndex, startIndex + RESULTS_PER_BATCH)
  const hasPreviousBatch = cursorHistory.length > 1
  const hasNextBatch = startIndex + RESULTS_PER_BATCH < results.length
  const activeFilterCount = [mode === "services" ? category : "", area].filter(Boolean).length

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  function changeMode(nextMode: DiscoveryMode) {
    const next = new URLSearchParams(params)
    if (nextMode === "services") next.delete("mode")
    else next.set("mode", nextMode)
    setParams(next)
  }

  function resetFilters() {
    const next = new URLSearchParams(params)
    next.delete("category")
    next.delete("area")
    setParams(next)
  }

  function clearSearch() {
    setParams({})
  }

  function goToNextBatch() {
    if (!hasNextBatch) return
    const nextCursor = visibleProfessionals.at(-1)?.id
    if (nextCursor) {
      setCursorState({ key: browseStateKey, history: [...cursorHistory, nextCursor] })
    }
  }

  function goToPreviousBatch() {
    if (hasPreviousBatch) {
      setCursorState({ key: browseStateKey, history: cursorHistory.slice(0, -1) })
    }
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6 sm:py-8 md:px-8 lg:px-12">
      <nav className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-on-variant">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="font-semibold text-primary">Browse services</span>
      </nav>

      <section aria-labelledby="browse-title">
        <h1 id="browse-title" className="text-xl font-semibold text-primary sm:text-2xl">
          Available professionals
        </h1>

        <div className="mt-4 flex flex-col gap-2 rounded-xl bg-surface-lowest p-2 shadow-raised sm:flex-row">
          <fieldset className="flex shrink-0 gap-1 rounded-lg bg-surface-low p-1 sm:w-64">
            <legend className="sr-only">Search for</legend>
            {(["services", "professionals"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={mode === item}
                onClick={() => changeMode(item)}
                className={`interactive-control min-h-10 flex-1 rounded-md px-2 text-sm font-semibold capitalize focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  mode === item ? "bg-surface-lowest text-primary shadow-card" : "text-on-variant"
                }`}
              >
                {item}
              </button>
            ))}
          </fieldset>
          <label className="sr-only" htmlFor="browse-query">
            {mode === "services" ? "Search a service or trade" : "Search by professional name"}
          </label>
          <input
            id="browse-query"
            value={query}
            onChange={(event) => updateFilter("q", event.target.value)}
            placeholder={mode === "services" ? "Search a service or trade" : "Search by professional name"}
            className="h-12 w-full min-w-0 flex-1 rounded-lg bg-surface-low px-4 py-3 text-on-surface sm:px-3 sm:py-0"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="browse-filters"
            onClick={() => setFiltersOpen((open) => !open)}
            className="interactive-control inline-flex min-h-11 items-center gap-2 rounded-lg bg-surface-lowest px-3 text-sm font-semibold text-primary shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Icon name="tune" className="text-[20px]" />
            Filters
            {activeFilterCount > 0 ? (
              <span className="rounded-full bg-primary-container px-2 py-0.5 text-xs text-on-primary">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
          <p className="text-sm text-on-variant" aria-live="polite">
            {results.length} {results.length === 1 ? "professional" : "professionals"}
          </p>
        </div>

        {filtersOpen ? (
          <section id="browse-filters" aria-label="Browse filters" className="mt-3 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Filters</h2>
              <button type="button" className="min-h-11 text-xs font-semibold text-secondary" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {mode === "services" ? (
                <fieldset>
                  <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Category</legend>
                  <div className="grid gap-x-4 sm:grid-cols-2">
                    <label className="mb-1 flex min-h-11 items-center gap-2 text-sm">
                      <input type="radio" name="category" checked={!category} onChange={() => updateFilter("category", "")} />
                      All categories
                    </label>
                    {CATEGORIES.map((item) => (
                      <label key={item.id} className="mb-1 flex min-h-11 items-center gap-2 text-sm">
                        <input type="radio" name="category" checked={category === item.id} onChange={() => updateFilter("category", item.id)} />
                        {item.name}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : null}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary" htmlFor="filter-area">
                  Service area
                </label>
                <select
                  id="filter-area"
                  value={area}
                  onChange={(event) => updateFilter("area", event.target.value)}
                  className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
                >
                  <option value="">All sub-cities</option>
                  {SUB_CITIES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>
          </section>
        ) : null}
      </section>

      <section className="mt-6" aria-label="Professional search results">
        {loading ? <p role="status" className="py-8 text-center text-sm text-on-variant">Loading professionals…</p> : error ? <p role="alert" className="py-8 text-center text-sm text-on-variant">Could not load professionals. Please try again.</p> : results.length === 0 ? (
          <EmptyState
            title={mode === "services" ? "No professionals offer matching services" : "No professionals match that name"}
            body="Try another search term, category, or service area."
            action={{ label: "Clear search and filters", onClick: clearSearch }}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleProfessionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        )}

        {hasPreviousBatch || hasNextBatch ? (
          <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Professionals pagination">
            <button
              type="button"
              className="interactive-control inline-flex min-h-11 items-center justify-center gap-1 rounded-lg border border-outline-variant/50 px-3 text-sm font-semibold text-primary hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!hasPreviousBatch}
              onClick={goToPreviousBatch}
            >
              <Icon name="chevron_left" />
              Previous
            </button>
            <button
              type="button"
              className="interactive-control inline-flex min-h-11 items-center justify-center gap-1 rounded-lg border border-outline-variant/50 px-3 text-sm font-semibold text-primary hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!hasNextBatch}
              onClick={goToNextBatch}
            >
              Next
              <Icon name="chevron_right" />
            </button>
          </nav>
        ) : null}
      </section>
    </div>
  )
}
