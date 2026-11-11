import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { Avatar } from "../components/Avatar"

export function ResidentAccountPage() {
  const { session, enableProfessional, setActiveView } = useAuth()
  const navigate = useNavigate()
  if (!session) return <Navigate to="/login?next=/account" replace />

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 md:px-8">
      <div className="flex items-center gap-3 sm:gap-4">
        <Avatar name={session.name} photo={session.photo} size="lg" />
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-primary sm:text-3xl">{session.name}</h1>
          <p className="text-sm text-on-variant sm:text-base">Resident view</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-on-variant sm:text-base">
        One Hamrfix login. Switch to professional view from your photo in the top corner when you have a listing.
      </p>
      <div className="mt-6 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
        <h2 className="text-lg font-semibold text-primary">Household details</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-on-variant">Email</dt>
            <dd className="mt-1 break-all text-primary">{session.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-on-variant">Phone</dt>
            <dd className="mt-1 text-primary">{session.phone || "Not added yet"}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-on-variant">Sub-city</dt>
            <dd className="mt-1 text-primary">{session.area || "Not selected"}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to="/account/edit" className="interactive-control inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary">
            Edit household details
          </Link>
          <Link to="/browse" className="interactive-control inline-flex min-h-11 items-center justify-center rounded-lg bg-surface-low px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-high">
            Browse services
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
        <h2 className="text-lg font-semibold text-primary">Professional listing</h2>
        {session.professional ? (
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={session.name} photo={session.professional.photo || session.photo} size="md" />
              <div>
                <p className="font-semibold text-primary">{session.professional.profession || "Profession not set yet"}</p>
                <p className="text-sm text-on-variant">
                  {session.professional.areas.length > 0 ? session.professional.areas.join(", ") : "No areas selected"}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="interactive-control inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary"
              onClick={() => {
                setActiveView("professional")
                navigate("/professional")
              }}
            >
              Switch to professional view
            </button>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-on-variant">
              Showcase your services and reach potential customers.
            </p>
            <Link
              to="/professional/edit"
              onClick={() => enableProfessional()}
              className="mt-4 inline-flex rounded-lg bg-surface-low px-4 py-2 text-sm font-semibold text-primary"
            >
              Create a Listing
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
