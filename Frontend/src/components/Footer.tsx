import { Link } from "react-router-dom"
import { SUB_CITIES } from "../data/catalog"
import { Icon } from "./Icon"

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-surface-low">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:py-10 md:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container text-on-primary">
                <Icon name="build" className="text-[18px]" />
              </div>
              <span className="text-lg font-semibold text-primary">Hamrfix</span>
            </div>
            <p className="text-sm text-on-variant">
              A directory for Addis Ababa households to find local service professionals and contact them directly.
            </p>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Sub-cities
            </div>
            <div className="flex max-w-xl flex-wrap gap-2">
              {SUB_CITIES.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-outline-variant/40 bg-surface-high px-3 py-1 text-xs font-semibold text-primary-container"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <Link to="/browse" className="text-secondary">
              Browse services
            </Link>
            <Link to="/register" className="text-secondary">
              Create an account
            </Link>
            <Link to="/about" className="text-secondary">
              About Hamrfix
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-outline-variant/20 pt-6 text-xs text-on-variant">
          © 2026 Hamrfix. Home-service discovery for Addis Ababa.
        </div>
      </div>
    </footer>
  )
}
