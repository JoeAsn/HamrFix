import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { Avatar } from "./Avatar"
import { Icon } from "./Icon"

export function Header() {
  const { session, logout, setActiveView, enableProfessional } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const isProView = session?.activeView === "professional"

  const publicLinks = session
    ? isProView
      ? [
        { to: "/", label: "Home", end: true },
        { to: "/browse", label: "Browse services", end: false },
        { to: "/about", label: "About", end: false },
      ]
      : [
        { to: "/", label: "Home", end: true },
        { to: "/browse", label: "Browse services", end: false },
        { to: "/about", label: "About", end: false },
      ]
    : [
      { to: "/", label: "Home", end: true },
      { to: "/browse", label: "Browse services", end: false },
      { to: "/login?next=/professional/edit", label: "Become a professional", end: false },
      { to: "/about", label: "About", end: false },
    ]

  const headerPhoto = isProView ? session?.professional?.photo || session?.photo : session?.photo

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  function switchTo(view: "resident" | "professional") {
    if (view === "professional" && session && !session.professional) enableProfessional()
    else setActiveView(view)
    setMenuOpen(false)
    setOpen(false)
    navigate(view === "professional" ? "/professional" : "/account")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/20 bg-surface-lowest/95 backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-[1280px] items-center justify-between gap-2 px-4 py-2 sm:min-h-16 md:px-8 lg:px-12">
        <Link to={isProView ? "/professional" : "/"} className="flex min-w-0 items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-container text-on-primary">
            <Icon name="build" />
          </div>
          <div className="min-w-0">
            <div className="text-base font-semibold tracking-tight text-primary sm:text-lg">Hamrfix</div>
            <div className="-mt-0.5 truncate text-[10px] font-semibold uppercase tracking-wider text-on-variant sm:text-[11px]">
              {isProView ? "Professional" : "Addis Ababa"}
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {publicLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? "bg-surface-high text-primary" : "text-on-variant hover:bg-surface-low"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {session ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full p-0.5 ring-2 ring-surface-container hover:ring-secondary"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <Avatar name={session.name} photo={headerPhoto} size="sm" />
                <span className="sr-only">Account menu</span>
              </button>
              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-outline-variant/40 bg-surface-lowest p-2 shadow-raised"
                >
                  <div className="flex items-center gap-3 rounded-lg px-2 py-2">
                    <Avatar name={session.name} photo={headerPhoto} size="md" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-primary">{session.name}</p>
                      <p className="text-xs text-on-variant">
                        {isProView ? "Professional view" : "Resident view"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 border-t border-outline-variant/30 pt-2">
                    <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-on-variant">
                      Switch workspace
                    </p>
                    <button
                      type="button"
                      role="menuitem"
                      className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${!isProView ? "bg-surface-low font-semibold text-primary" : "text-on-surface hover:bg-surface-low"
                        }`}
                      onClick={() => switchTo("resident")}
                    >
                      <span>Resident</span>
                      {!isProView ? <Icon name="check" className="text-[18px]" /> : null}
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${isProView ? "bg-surface-low font-semibold text-primary" : "text-on-surface hover:bg-surface-low"
                        }`}
                      onClick={() => switchTo("professional")}
                    >
                      <span>Professional</span>
                      {isProView ? <Icon name="check" className="text-[18px]" /> : null}
                    </button>
                  </div>
                  <div className="mt-1 border-t border-outline-variant/30 pt-1">
                    <Link
                      to="/account"
                      role="menuitem"
                      className="block min-h-11 rounded-lg px-3 py-2 text-sm hover:bg-surface-low"
                      onClick={() => setMenuOpen(false)}
                    >
                      Account settings
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      className="block min-h-11 w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-low"
                      onClick={() => {
                        logout()
                        setMenuOpen(false)
                        navigate("/")
                      }}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-secondary sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex min-h-11 items-center rounded-lg bg-primary-container px-3 py-2 text-sm font-semibold text-on-primary sm:px-4"
              >
                Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-primary md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="space-y-1 border-t border-outline-variant/30 px-4 py-3 md:hidden">
          {publicLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold text-on-surface"
            >
              {link.label}
            </Link>
          ))}
          {!session && (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold text-on-surface sm:hidden"
            >
              Log in
            </Link>
          )}
        </nav>
      ) : null}
    </header>
  )
}
