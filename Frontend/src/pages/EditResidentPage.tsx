import { useState, type FormEvent } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { PhotoField } from "../components/PhotoField"
import { SUB_CITIES, type SubCity } from "../data/catalog"

export function EditResidentPage() {
  const { session, updateHousehold } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(session?.name ?? "")
  const [phone, setPhone] = useState(session?.phone ?? "")
  const [area, setArea] = useState<SubCity | "">(session?.area ?? "")
  const [photo, setPhoto] = useState(session?.photo ?? "")

  if (!session) return <Navigate to="/login?next=/account/edit" replace />

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    updateHousehold({ name, phone, area, photo })
    navigate("/account")
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-10">
      <Link to="/account" className="text-sm font-semibold text-secondary">
        Back to account
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">Edit household details</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
        <PhotoField name={name} photo={photo} onChange={setPhoto} label="Resident photo" />
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-12 w-full rounded-lg bg-surface-low px-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="h-12 w-full rounded-lg bg-surface-low px-3 text-sm"
            placeholder="+251 ..."
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="area">
            Sub-city
          </label>
          <select
            id="area"
            value={area}
            onChange={(event) => setArea(event.target.value as SubCity | "")}
            className="h-12 w-full rounded-lg bg-surface-low px-3 text-sm"
          >
            <option value="">Select an area</option>
            {SUB_CITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="min-h-11 w-full rounded-lg bg-primary-container px-5 py-3 text-sm font-semibold text-on-primary sm:w-auto">
          Save changes
        </button>
      </form>
    </div>
  )
}
