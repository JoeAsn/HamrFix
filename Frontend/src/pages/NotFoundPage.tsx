import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-primary">Page not found</h1>
      <p className="mt-2 text-sm text-on-variant">This route is not part of the Hamrfix MVP.</p>
      <Link to="/" className="mt-4 inline-flex text-sm font-semibold text-secondary">
        Return home
      </Link>
    </div>
  )
};
