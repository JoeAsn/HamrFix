import { useState, type FormEvent } from "react"
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

export function LoginPage() {
  const { login, session } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get("next") || ""
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  if (session) {
    const home = session.activeView === "professional" ? "/professional" : "/account"
    return <Navigate to={next || home} replace />
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const problem = login(email, password)
    if (problem) {
      setError(problem)
      return
    }
    navigate(next || (email.toLowerCase().includes("@hamrfix.et") ? "/professional" : "/account"))
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-primary sm:text-3xl">Log in</h1>
      <p className="mt-2 text-sm text-on-variant">
        Sign in with your email. The same account can find professionals and list a trade.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl bg-surface-lowest p-4 shadow-card sm:p-6">
        {error ? (
          <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container" role="alert">
            {error}
          </p>
        ) : null}
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
            placeholder="you@example.com"
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
        </div>
        <button type="submit" className="interactive-control w-full rounded-lg bg-primary-container py-3 text-sm font-semibold text-on-primary hover:bg-primary">
          Log in
        </button>
        <p className="text-center text-sm text-on-variant">
          New to Hamrfix?{" "}
          <Link to={`/register${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-secondary">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  )
}
