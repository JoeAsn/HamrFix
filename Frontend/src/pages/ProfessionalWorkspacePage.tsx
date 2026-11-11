import { useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { Avatar } from "../components/Avatar"
import { Chip } from "../components/Chip"
import { EmptyState } from "../components/EmptyState"

export function ProfessionalWorkspacePage() {
  const { session, enableProfessional } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (session && !session.professional) enableProfessional()
  }, [session, enableProfessional])

  if (!session) return <Navigate to="/login?next=/professional" replace />

  const listing = session.professional
  if (!listing) return <Navigate to="/professional/edit" replace />

  const incomplete = !listing.bio || listing.areas.length === 0 || listing.services.length === 0

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10 md:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar name={session.name} photo={listing.photo || session.photo} size="lg" />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-on-variant">Professional view</p>
            <h1 className="text-2xl font-semibold text-primary sm:text-3xl">{session.name}</h1>
            <p className="text-sm text-on-variant sm:text-base">{listing.profession || "Add your profession"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link to="/account"           className="interactive-control inline-flex min-h-11 items-center justify-center rounded-lg bg-surface-low px-4 py-2.5 text-sm font-semibold text-primary hover:bg-surface-high">
            My account
          </Link>
          <Link
            to="/professional/edit"
            className="interactive-control inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary"
          >
            Edit listing
          </Link>
        </div>
      </div>

      {incomplete ? (
        <p className="mt-6 rounded-lg bg-tertiary-fixed px-4 py-3 text-sm text-on-tertiary-fixed">
          Finish your public listing so residents can understand your trade, services, and areas.
        </p>
      ) : null}

      <section className="mt-8 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
        <h2 className="text-xl font-semibold text-primary">About</h2>
        <p className="mt-2 text-sm text-on-variant">{listing.bio || "No overview yet."}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {listing.areas.length === 0 ? (
            <span className="text-sm text-on-variant">No service areas selected.</span>
          ) : (
            listing.areas.map((area) => <Chip key={area}>{area}</Chip>)
          )}
        </div>
        <p className="mt-4 text-sm text-on-variant">
          Phone: {listing.phone || "Not added"} · Telegram: {listing.telegram || "Not added"}
        </p>
      </section>

      <section className="mt-6 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
        <h2 className="text-xl font-semibold text-primary">Services</h2>
        {listing.services.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="No services listed"
              body="Add the work you offer under your profession. Residents see this list on your public profile."
              action={{
                label: "Add services",
                onClick: () => navigate("/professional/edit"),
              }}
            />
          </div>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {listing.services.map((service) => (
              <li key={service.id} className="rounded-lg bg-surface-low p-4">
                <h3 className="font-semibold text-primary">{service.name}</h3>
                <p className="mt-1 text-sm text-on-variant">{service.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
