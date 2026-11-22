import { useEffect, useState, type FormEvent } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import type { ProfessionalListing } from "../auth/types"
import { PhotoField } from "../components/PhotoField"
import { CATEGORIES, SUB_CITIES, type CategoryId, type SubCity } from "../data/catalog"

interface ServiceAreaSelection {
  primary_service_area: string | null
  secondary_service_areas: string[]
}

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
  const [serviceAreas, setServiceAreas] = useState<ServiceAreaSelection>(() => ({
    primary_service_area: current.areas[0] ?? null,
    secondary_service_areas: current.areas.slice(1, 3),
  }))
  const [serviceName, setServiceName] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session && !session.professional) enableProfessional()
  }, [session, enableProfessional])

  if (!session) return <Navigate to="/login?next=/professional/edit" replace />

  const selectedAreaCount =
    (serviceAreas.primary_service_area ? 1 : 0) + serviceAreas.secondary_service_areas.length
  const atMaximum = selectedAreaCount >= 3

  function setPrimaryArea(area: SubCity | "") {
    setServiceAreas((currentAreas) => ({
      primary_service_area: area || null,
      secondary_service_areas: area
        ? currentAreas.secondary_service_areas.filter((item) => item !== area)
        : currentAreas.secondary_service_areas,
    }))
  }

  function addSecondaryArea(area: SubCity | "") {
    if (!area) return
    setServiceAreas((currentAreas) => {
      if (
        currentAreas.secondary_service_areas.length >= 2 ||
        area === currentAreas.primary_service_area ||
        currentAreas.secondary_service_areas.includes(area)
      ) return currentAreas
      return { ...currentAreas, secondary_service_areas: [...currentAreas.secondary_service_areas, area] }
    })
  }

  function removeSecondaryArea(area: string) {
    setServiceAreas((currentAreas) => ({
      ...currentAreas,
      secondary_service_areas: currentAreas.secondary_service_areas.filter((item) => item !== area),
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
    if (!serviceAreas.primary_service_area) {
      setError("Select a primary service area before saving your profile.")
      return
    }
    if (profile.services.length === 0) {
      setError("List at least one service under your profession.")
      return
    }
    updateProfessional({
      ...profile,
      areas: [serviceAreas.primary_service_area, ...serviceAreas.secondary_service_areas] as SubCity[],
    })
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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-primary">Service areas</h2>
              <p className="mt-1 text-sm text-on-variant">Choose your main operating location and up to two nearby sub-cities.</p>
            </div>
            <p className="rounded-full bg-primary-container px-3 py-1.5 text-sm font-semibold text-on-primary" aria-live="polite">
              {selectedAreaCount}/3 locations selected
            </p>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-primary" htmlFor="primary-area">Primary Service Area</label>
              <p className="mb-2 text-sm text-on-variant">Your main operating location. You can change it anytime.</p>
              <select
                id="primary-area"
                value={serviceAreas.primary_service_area ?? ""}
                onChange={(event) => setPrimaryArea(event.target.value as SubCity | "")}
                aria-invalid={!serviceAreas.primary_service_area && Boolean(error)}
                className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
              >
                <option value="">Select a primary area</option>
                {SUB_CITIES.map((area) => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-primary" htmlFor="secondary-area">Additional Service Areas</label>
              <p className="mb-2 text-sm text-on-variant">Optional. Select up to two other locations.</p>
              <select
                id="secondary-area"
                value=""
                onChange={(event) => addSecondaryArea(event.target.value as SubCity | "")}
                disabled={serviceAreas.secondary_service_areas.length >= 2 || atMaximum}
                className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">{atMaximum ? "Maximum service areas selected" : "Add an area"}</option>
                {SUB_CITIES.filter((area) => area !== serviceAreas.primary_service_area && !serviceAreas.secondary_service_areas.includes(area)).map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 min-h-12 rounded-lg bg-surface-low p-3" aria-live="polite">
            {serviceAreas.secondary_service_areas.length ? (
              <ul className="flex flex-wrap gap-2" aria-label="Selected additional service areas">
                {serviceAreas.secondary_service_areas.map((area) => (
                  <li key={area} className="inline-flex items-center gap-2 rounded-full bg-surface-lowest px-3 py-1.5 text-sm font-medium text-primary">
                    {area}
                    <button type="button" onClick={() => removeSecondaryArea(area)} aria-label={`Remove ${area} additional service area`} className="rounded-full px-1 font-bold text-secondary hover:bg-surface-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">×</button>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-on-variant">No additional areas selected yet. You can save with none.</p>}
          </div>
          {atMaximum ? (
            <p className="mt-3 text-sm font-medium text-secondary" role="status">You've reached the maximum of three service areas. Remove an existing location to select another.</p>
          ) : null}
          {!serviceAreas.primary_service_area && error ? (
            <p className="mt-3 text-sm text-error" role="alert">A primary service area is required.</p>
          ) : null}
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
