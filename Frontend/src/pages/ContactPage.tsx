import { useState, type FormEvent } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { getProfessional } from "../data/catalog"

export function ContactPage() {
  const { id = "" } = useParams()
  const { session } = useAuth()
  const professional = getProfessional(id)
  const [serviceId, setServiceId] = useState(professional?.services[0]?.id ?? "")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!professional) {
    return <Navigate to="/browse" replace />
  }

  if (!session) {
    return <Navigate to={`/register?next=/professionals/${id}/contact`} replace />
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!message.trim()) {
      setError("Write a short note so the professional knows what you need.")
      return
    }
    setError(null)
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8 md:px-8">
      <nav className="mb-6 text-sm text-on-variant">
        <Link to={`/professionals/${id}`} className="hover:text-primary">
          {professional.name}
        </Link>
        <span className="px-2">/</span>
        <span className="font-semibold text-primary">Contact</span>
      </nav>
      <h1 className="text-2xl font-semibold text-primary sm:text-3xl">Contact {professional.name}</h1>
      <p className="mt-2 text-on-variant">
        Share what you need. Hamrfix does not schedule the visit or take payment. You contact the professional directly.
      </p>

      {sent ? (
        <div className="mt-8 rounded-xl bg-surface-lowest p-6 shadow-card">
          <h2 className="text-xl font-semibold text-primary">Message ready</h2>
          <p className="mt-2 text-sm text-on-variant">
            Use the details below to reach {professional.name} now. Copy your note if you want to send it by phone or Telegram.
          </p>
          <div className="mt-4 space-y-2 rounded-lg bg-surface-low p-4 text-sm">
            <p>
              <strong>Phone:</strong> {professional.phone}
            </p>
            <p>
              <strong>Telegram:</strong> {professional.telegram}
            </p>
            <p>
              <strong>Your note:</strong> {message}
            </p>
          </div>
          <Link to={`/professionals/${id}`} className="mt-4 inline-flex text-sm font-semibold text-secondary">
            Return to profile
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
          {error ? (
            <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container" role="alert">
              {error}
            </p>
          ) : null}
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="service">
              Service
            </label>
            <select
              id="service"
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
              className="h-11 w-full rounded-lg bg-surface-low px-3 text-sm"
            >
              {professional.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="w-full rounded-lg bg-surface-low p-3 text-sm"
              placeholder="Describe the work, your sub-city, and a good time to call."
            />
          </div>
          <button
            type="submit"
            className="interactive-control rounded-lg bg-primary-container px-5 py-3 text-sm font-semibold text-on-primary hover:bg-primary"
          >
            Show contact details
          </button>
        </form>
      )}
    </div>
  )
}
