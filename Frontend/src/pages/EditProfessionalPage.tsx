import { useEffect, useState, type FormEvent } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import type { ProfessionalListing } from "../auth/types"
import { PhotoField } from "../components/PhotoField"
import { CATEGORIES, SUB_CITIES, type CategoryId, type SubCity } from "../data/catalog"

const emptyListing: ProfessionalListing = {
  profession: "",
  categoryId: "plumbing",
  bio: "",
  phone: "",
  telegram: "",
  photo: "",
  areas: [],
  services: [],
}

export function EditProfessionalPage() {
  const { session, updateProfessional, enableProfessional } = useAuth()
  const navigate = useNavigate()
  const current = session?.professional ?? emptyListing
  const [profile, setProfile] = useState<ProfessionalListing>(current)
  const [serviceName, setServiceName] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session && !session.professional) enableProfessional()
  }, [session, enableProfessional])

  if (!session) return <Navigate to="/login?next=/professional/edit" replace />

  function toggleArea(area: SubCity) {
    setProfile((existing) => ({
      ...existing,
      areas: existing.areas.includes(area)
        ? existing.areas.filter((item) => item !== area)
        : [...existing.areas, area],
    }))
  }

  function addService() {
    if (!serviceName.trim()) return
    setProfile((current) => ({
      ...current,
      services: [
        ...current.services,
        {
          id: `${serviceName.toLowerCase().replace(/\s+/g, "-")}-${current.services.length + 1}`,
          name: serviceName.trim(),
          description: serviceDescription.trim() || "No description provided.",
        },
      ],
    }))
    setServiceName("")
    setServiceDescription("")
  }

  function removeService(id: string) {
    setProfile((current) => ({
      ...current,
      services: current.services.filter((service) => service.id !== id),
    }))
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!profile.profession.trim()) {
      setError("Enter your profession.")
      return
    }
    if (profile.areas.length === 0) {
      setError("Select at least one service area.")
      return
    }
    if (profile.services.length === 0) {
      setError("List at least one service under your profession.")
      return
    }
    updateProfessional(profile)
    navigate("/professional")
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 md:px-8">
      <Link to="/professional" className="text-sm font-semibold text-secondary">
        Back to profile
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">Edit professional profile</h1>
      <p className="mt-2 text-sm text-on-variant">
        Residents see your profession, services, areas, and how to contact you. Keep this information current.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-8">
        {error ? (
          <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container" role="alert">
            {error}
          </p>
        ) : null}
        <section className="rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold text-primary">Identity</h2>
          <p className="mt-1 text-sm text-on-variant">Listed as {session.name}.</p>
          <div className="mt-4">
            <PhotoField
              name={session.name}
              photo={profile.photo}
              onChange={(photo) => setProfile({ ...profile, photo })}
              label="Professional photo"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                value={profile.phone}
                onChange={(event) => setProfile({ ...profile, phone: event.target.value })}
                className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="telegram">
                Telegram
              </label>
              <input
                id="telegram"
                value={profile.telegram}
                onChange={(event) => setProfile({ ...profile, telegram: event.target.value })}
                className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="profession">
                Profession
              </label>
              <input
                id="profession"
                value={profile.profession}
                onChange={(event) => setProfile({ ...profile, profession: event.target.value })}
                className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={profile.categoryId}
                onChange={(event) =>
                  setProfile({ ...profile, categoryId: event.target.value as CategoryId })
                }
                className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
              >
                {CATEGORIES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-semibold" htmlFor="bio">
                Overview
              </label>
              <textarea
                id="bio"
                rows={4}
                value={profile.bio}
                onChange={(event) => setProfile({ ...profile, bio: event.target.value })}
                className="w-full rounded-lg bg-surface-low p-3 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold text-primary">Service areas</h2>
          <p className="mt-1 text-sm text-on-variant">Select every sub-city where you take work.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SUB_CITIES.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => toggleArea(area)}
                className={`min-h-9 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  profile.areas.includes(area)
                    ? "bg-primary-container text-on-primary"
                    : "bg-surface-low text-primary"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold text-primary">Services under this profession</h2>
          <ul className="mt-4 space-y-2">
            {profile.services.map((service) => (
              <li key={service.id} className="flex items-start justify-between gap-3 rounded-lg bg-surface-low p-3">
                <div>
                  <div className="font-semibold text-primary">{service.name}</div>
                  <p className="text-sm text-on-variant">{service.description}</p>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-error"
                  onClick={() => removeService(service.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={serviceName}
              onChange={(event) => setServiceName(event.target.value)}
              placeholder="Service name"
              className="h-11 rounded-lg bg-surface-low px-3 text-sm"
            />
            <input
              value={serviceDescription}
              onChange={(event) => setServiceDescription(event.target.value)}
              placeholder="Short description"
              className="h-11 rounded-lg bg-surface-low px-3 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={addService}
            className="mt-3 rounded-lg bg-surface-high px-4 py-2 text-sm font-semibold text-primary"
          >
            Add service
          </button>
        </section>

        <button type="submit" className="min-h-11 w-full rounded-lg bg-primary-container px-5 py-3 text-sm font-semibold text-on-primary sm:w-auto">
          Save profile
        </button>
      </form>
    </div>
  )
}
