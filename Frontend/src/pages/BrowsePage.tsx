import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { EmptyState } from "../components/EmptyState"
import { Icon } from "../components/Icon"
import { ProfessionalCard } from "../components/ProfessionalCard"
import { CATEGORIES, SUB_CITIES, filterProfessionals } from "../data/catalog"

const RESULTS_PER_PAGE = 4

export function BrowsePage() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const query = params.get("q") ?? ""
  const category = params.get("category") ?? ""
  const area = params.get("area") ?? ""
  const requestedPage = Number.parseInt(params.get("page") ?? "1", 10)

  const results = useMemo(
    () => filterProfessionals(query, category, area),
    [query, category, area],
  )
  const totalPages = Math.max(1, Math.ceil(results.length / RESULTS_PER_PAGE))
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1
  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  )

  function update(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete("page")
    setParams(next)
  }

  function goToPage(page: number) {
    const next = new URLSearchParams(params)
    if (page === 1) next.delete("page")
    else next.set("page", String(page))
    setParams(next)
  }

  const activeFilterCount = [query, category, area].filter(Boolean).length

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6 sm:py-8 md:px-8 lg:px-12">
      <nav className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-on-variant">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-primary">Browse services</span>
      </nav>
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <aside className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-surface-lowest px-3 py-2 text-sm font-semibold text-primary shadow-card"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((value) => !value)}
            >
              <Icon name="tune" className="text-[20px]" />
              Filters
              {activeFilterCount > 0 ? (
                <span className="rounded-full bg-primary-container px-2 py-0.5 text-xs text-on-primary">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>
            <p className="text-sm text-on-variant">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
          </div>
          <div
            className={`rounded-xl bg-surface-lowest p-4 shadow-card sm:p-5 lg:sticky lg:top-24 ${
              filtersOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold text-primary">Filters</h1>
              <button
                type="button"
                className="min-h-11 text-xs font-semibold text-secondary"
                onClick={() => setParams({})}
              >
                Reset
              </button>
            </div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-primary" htmlFor="filter-query">
              Search
            </label>
            <input
              id="filter-query"
              value={query}
              onChange={(event) => update("q", event.target.value)}
              placeholder="Name, service, or trade"
              className="mb-4 h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
            />
            <fieldset className="mb-4">
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                Category
              </legend>
              <label className="mb-1 flex min-h-11 items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="category"
                  checked={!category}
                  onChange={() => update("category", "")}
                />
                All categories
              </label>
              {CATEGORIES.map((item) => (
                <label key={item.id} className="mb-1 flex min-h-11 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="category"
                    checked={category === item.id}
                    onChange={() => update("category", item.id)}
                  />
                  {item.name}
                </label>
              ))}
            </fieldset>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-primary" htmlFor="filter-area">
              Service area
            </label>
            <select
              id="filter-area"
              value={area}
              onChange={(event) => update("area", event.target.value)}
              className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
            >
              <option value="">All sub-cities</option>
              {SUB_CITIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </aside>
        <section className="lg:col-span-9">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-primary sm:text-2xl">Available professionals</h2>
            <p className="text-sm text-on-variant">
              {results.length} {results.length === 1 ? "result" : "results"}
              {category ? ` in ${CATEGORIES.find((item) => item.id === category)?.name ?? category}` : ""}
              {area ? ` covering ${area}` : ""}
            </p>
          </div>
          {results.length === 0 ? (
            <EmptyState
              title="No professionals match these filters"
              body="Try another category, a broader area, or a shorter search term."
              action={{ label: "Clear filters", onClick: () => setParams({}) }}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {paginatedResults.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>
          )}
          {results.length > RESULTS_PER_PAGE ? (
            <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Professionals pagination">
              <button
                type="button"
                className="interactive-control inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-outline-variant/50 text-primary hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                <Icon name="chevron_left" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`interactive-control inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 text-sm font-semibold ${
                    page === currentPage
                      ? "bg-primary text-on-primary"
                      : "border border-outline-variant/50 text-primary hover:bg-surface-low"
                  }`}
                  aria-current={page === currentPage ? "page" : undefined}
                  aria-label={`Go to page ${page}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="interactive-control inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-outline-variant/50 text-primary hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                <Icon name="chevron_right" />
              </button>
            </nav>
          ) : null}
        </section>
      </div>
    </div>
  )
}
