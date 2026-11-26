import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import { Icon } from "../components/Icon"
import type { Professional } from "../data/catalog"
import { getProfessionalDetails } from "../data/api"

export function ProfessionalProfilePage() {
  const { professionalId = "" } = useParams()
  const { session } = useAuth()
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    let active = true
    setLoading(true)
    setError(false)
    getProfessionalDetails(professionalId).then((data) => { if (active) setProfessional(data) }).catch((reason: Error) => { if (active) { setError(reason.message !== "not-found"); setProfessional(null) } }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [professionalId])

  if (loading) return <p role="status" className="mx-auto max-w-xl px-4 py-16 text-center text-sm text-on-variant">Loading professional…</p>
  if (error) return <div role="alert" className="mx-auto max-w-xl px-4 py-16 text-center"><h1 className="text-2xl font-semibold text-primary">Could not load professional</h1><Link to="/browse" className="mt-4 inline-flex text-sm font-semibold text-secondary">Back to browse</Link></div>

  if (!professional) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-primary">Professional not found</h1>
        <p className="mt-2 text-sm text-on-variant">This profile is not in the directory.</p>
        <Link to="/browse" className="mt-4 inline-flex text-sm font-semibold text-secondary">
          Back to browse
        </Link>
      </div>
    )
  }

  const canSeeContact = Boolean(session)

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-8 lg:px-12">
      <nav className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-on-variant sm:mb-6">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link to="/browse" className="hover:text-primary">
          Browse
        </Link>
        <span>/</span>
        <span className="font-semibold text-primary">{professional.name}</span>
      </nav>
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              {professional.photo ? (
                <img src={professional.photo} alt="" className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28" />
              ) : (
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-primary-container text-2xl font-semibold text-on-primary sm:h-28 sm:w-28">
                  {professional.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold text-primary sm:text-3xl">{professional.name}</h1>
                <p className="mt-1 text-on-variant">
                  {professional.profession}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {professional.areas.slice(0, 3).map((area) => (
                    <span key={area.name} className={`inline-flex min-h-9 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${area.isPrimary ? "bg-primary-container text-on-primary" : "border border-outline-variant/40 bg-surface-low text-primary-container"}`}>
                      {area.isPrimary ? <span className="material-symbols-outlined text-[15px]" aria-hidden="true">star</span> : null}
                      {area.name}{area.isPrimary ? <span className="ml-0.5">· Primary</span> : null}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-on-variant">{professional.bio}</p>
          </div>
          <section className="mt-5 rounded-xl bg-surface-lowest p-4 shadow-card sm:mt-6 sm:p-6">
            <h2 className="text-xl font-semibold text-primary">Services offered</h2>
            <p className="mt-1 text-sm text-on-variant">
              All services listed under this professional’s {professional.profession.toLowerCase()} trade.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {professional.services.map((service) => (
                <li key={service.id} className="rounded-lg bg-surface-low p-4">
                  <h3 className="font-semibold text-primary">{service.name}</h3>
                  <p className="mt-1 text-sm text-on-variant">{service.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="lg:col-span-4">
          <div className="rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6 lg:sticky lg:top-24">
            {canSeeContact ? (
              <>
                <h2 className="text-lg font-semibold text-primary">Contact this professional</h2>
                <div className="mt-4 space-y-3">
                  <a
                    href={`tel:${professional.phone.replace(/\s/g, "")}`}
                    className="interactive-control flex min-h-11 items-center gap-3 rounded-lg bg-surface-low p-3 text-sm font-semibold text-primary hover:bg-surface-high"
                  >
                    <Icon name="call" />
                    <span className="break-all">{professional.phone}</span>
                  </a>
                  <a
                    href={`https://t.me/${professional.telegram.replace("@", "")}`}
                    className="interactive-control flex min-h-11 items-center gap-3 rounded-lg bg-surface-low p-3 text-sm font-semibold text-primary hover:bg-surface-high"
                  >
                    <Icon name="send" />
                    <span className="break-all">Telegram {professional.telegram}</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-primary">Contact this professional</h2>
                <p className="mt-2 text-sm text-on-variant">
                  Reach this professional directly using the public contact details below.
                </p>
                <div className="mt-4 space-y-3">
                  <a href={`tel:${professional.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center rounded-lg bg-surface-low p-3 text-sm font-semibold text-primary">{professional.phone}</a>
                  {professional.telegram ? <a href={`https://t.me/${professional.telegram.replace("@", "")}`} className="flex min-h-11 items-center rounded-lg bg-surface-low p-3 text-sm font-semibold text-primary">Telegram {professional.telegram}</a> : null}
                </div>
                <Link
                  to={`/register?next=/professionals/${professional.id}`}
                  className="interactive-control mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary-container px-4 py-3 text-sm font-semibold text-on-primary hover:bg-primary"
                >
                  Create an account
                </Link>
                <Link
                  to={`/login?next=/professionals/${professional.id}`}
                  className="interactive-control mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-surface-low px-4 py-3 text-sm font-semibold text-primary hover:bg-surface-high"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
