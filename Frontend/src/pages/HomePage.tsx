import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CATEGORIES, SUB_CITIES } from "../data/catalog"
import { Icon } from "../components/Icon"
import { useAuth } from "../auth/AuthContext"

export function HomePage() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [area, setArea] = useState("")

  function onSearch(event: FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (area) params.set("area", area)
    navigate(`/browse?${params.toString()}`)
  }

  return (
    <div>
      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:py-12 md:px-8 lg:px-12 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="mb-3 inline-flex rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-primary-container">
              Home services in Addis Ababa
            </p>
            <h1 className="max-w-xl text-[1.75rem] font-bold leading-tight tracking-tight text-primary sm:text-4xl md:text-[40px] md:leading-12">
              Find local professionals and contact them directly.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-on-variant sm:mt-4 sm:text-base">
              Browse household service categories, filter by area, read what each professional offers, and reach them by phone or Telegram.
            </p>
            <form
              onSubmit={onSearch}
              className="mt-5 flex w-full max-w-2xl flex-col gap-2 rounded-xl bg-surface-lowest p-2 shadow-raised sm:mt-6 lg:flex-row"
            >
              <label className="sr-only" htmlFor="home-area">
                Service area
              </label>
              <select
                id="home-area"
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="h-12 w-full shrink-0 rounded-lg bg-surface-low px-3 text-on-surface lg:w-44"
              >
                <option value="">All sub-cities</option>
                {SUB_CITIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="home-query">
                Search services
              </label>
              <input
                id="home-query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a service or trade"
                className="h-12 w-full min-w-0 flex-1 rounded-lg px-3"
              />
              <button
                type="submit"
                className="interactive-control inline-flex h-12 w-full items-center justify-center gap-1 rounded-lg bg-primary-container px-5 text-sm font-semibold text-on-primary hover:bg-primary sm:w-auto"
              >
                Find professionals
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
            </form>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-surface-lowest p-3 shadow-card sm:p-4">
              <img
                className="h-52 w-full rounded-lg object-cover sm:h-72 lg:h-80"
                alt="Electrician working on a residential circuit board"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSUMQRVg58y52xEtSwHjqEriO9fdXn4L-whudXZyGyDj8XumoIuR5VAb1rmL4NReAjpLxQwqYOesq-tCmfYlIQX6bdb7mRHWAMdm4n7mcfG8XEuoygZqCcN7069YSmLR5QMK1Xl3gaF7Ur1BANx0vr7hMZlZitrv6h_hMaB71wQWRG1YbRNJgp35mpbN7YxV2fgNs8XbYWUuQQYOhKE0eYqI48Yr_wRgi7QjBeBgE"
              />
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center sm:mt-4 sm:gap-2">
                <div className="rounded-lg bg-surface-low p-2 sm:p-3">
                  <div className="text-sm font-semibold text-primary sm:text-base">11</div>
                  <div className="text-[11px] text-on-variant sm:text-xs">Sub-cities</div>
                </div>
                <div className="rounded-lg bg-surface-low p-2 sm:p-3">
                  <div className="text-sm font-semibold text-primary sm:text-base">Direct</div>
                  <div className="text-[11px] text-on-variant sm:text-xs">Phone contact</div>
                </div>
                <div className="rounded-lg bg-surface-low p-2 sm:p-3">
                  <div className="text-sm font-semibold text-primary sm:text-base">Free</div>
                  <div className="text-[11px] text-on-variant sm:text-xs">To list a trade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-lowest py-10 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-12">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Household service categories</h2>
            <p className="mt-2 text-sm text-on-variant sm:text-base">Start with a trade, then filter professionals by the areas they serve.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/browse?category=${category.id}`}
                className="rounded-xl bg-surface-low p-4 transition hover:bg-surface-container sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-high text-primary-container">
                  <Icon name={category.icon} className="text-[26px]" />
                </div>
                <h3 className="text-lg font-semibold text-primary">{category.name}</h3>
                <p className="mt-1 text-sm text-on-variant">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:py-16 md:px-8 lg:px-12">
        <h2 className="text-2xl font-semibold text-primary sm:text-3xl">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Search by service or area",
              body: "Use the directory to find professionals who offer the work you need in your sub-city.",
            },
            {
              step: "2",
              title: "Read the profile",
              body: "See the profession, listed services, and the areas each person covers.",
            },
            {
              step: "3",
              title: "Contact them directly",
              body: "Create an account to view phone and Telegram details, then arrange the job yourselves.",
            },
          ].map((item) => (
            <li key={item.step} className="rounded-xl border border-outline-variant/40 bg-surface-lowest p-6">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-on-variant">{item.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-xl bg-primary-container p-5 text-on-primary sm:mt-10 sm:p-8">
          <h2 className="text-xl font-semibold sm:text-2xl">Are you a service professional?</h2>
          <p className="mt-2 max-w-2xl text-sm text-on-primary-container sm:text-base">
            Use the same Hamrfix account to list your profession, the services you offer, and the sub-cities you cover.
          </p>
          <Link
            to={session ? "/professional/edit" : "/login?next=/professional/edit"}
            className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-surface-lowest px-5 py-2.5 text-sm font-semibold text-primary"
          >
            Create a Listing
          </Link>
        </div>
      </section>
    </div>
  )
}
