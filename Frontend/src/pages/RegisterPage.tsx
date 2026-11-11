import { useState, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get("next") || ""
  const listTrade = params.get("list") === "1"
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const problem = register({ name, email, password, listTrade })
    if (problem) {
      setError(problem)
      return
    }
    navigate(listTrade ? "/professional/edit" : next || "/account")
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-primary sm:text-3xl">Create your Hamrfix account</h1>
      <p className="mt-2 text-sm text-on-variant">
        One account is enough. After you sign up you can contact professionals and, if you want, list your own trade on the same account.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
        {error ? (
          <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container" role="alert">
            {error}
          </p>
        ) : null}
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-12 w-full rounded-lg bg-surface-low px-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-lg bg-surface-low px-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-lg bg-surface-low px-3 text-sm"
          />
          <p className="mt-1 text-xs text-on-variant">Minimum 8 characters.</p>
        </div>
        <button type="submit" className="interactive-control w-full rounded-lg bg-primary-container py-3 text-sm font-semibold text-on-primary hover:bg-primary">
          Create account
        </button>
        <p className="text-center text-sm text-on-variant">
          Already have an account?{" "}
          <Link to={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-secondary">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}
