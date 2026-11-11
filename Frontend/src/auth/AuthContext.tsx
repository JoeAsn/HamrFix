import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { PROFESSIONALS } from "../data/catalog"
import type { AccountView, ProfessionalListing, Session } from "./types"

type AuthContextValue = {
  session: Session | null
  login: (email: string, password: string) => string | null
  register: (input: { name: string; email: string; password: string; listTrade?: boolean }) => string | null
  logout: () => void
  updateHousehold: (input: {
    name: string
    phone: string
    area: Session["area"]
    photo: string
  }) => void
  updateProfessional: (listing: ProfessionalListing) => void
  enableProfessional: () => void
  setActiveView: (view: AccountView) => void
}

const STORAGE_KEY = "hamrfix.session.v3"

const AuthContext = createContext<AuthContextValue | null>(null)

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Session
    if (!parsed?.email) return null
    return {
      ...parsed,
      photo: parsed.photo ?? "",
      activeView: parsed.activeView ?? "resident",
      professional: parsed.professional
        ? { ...parsed.professional, photo: parsed.professional.photo ?? "" }
        : null,
    }
  } catch {
    return null
  }
}

function emptyListing(photo = ""): ProfessionalListing {
  return {
    profession: "",
    categoryId: "plumbing",
    bio: "",
    phone: "",
    telegram: "",
    photo,
    areas: [],
    services: [],
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(loadSession)

  function persist(next: Session | null) {
    setSession(next)
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      login(email, password) {
        if (!email.trim() || password.length < 8) {
          return "Enter a valid email and a password of at least 8 characters."
        }
        const matchingPro = PROFESSIONALS.find(
          (pro) => `${pro.name.split(" ")[0].toLowerCase()}@hamrfix.et` === email.toLowerCase(),
        )
        if (matchingPro) {
          persist({
            name: matchingPro.name,
            email,
            phone: matchingPro.phone,
            area: matchingPro.areas[0] ?? "Bole",
            photo: matchingPro.photo,
            activeView: "professional",
            professional: {
              profession: matchingPro.profession,
              categoryId: matchingPro.categoryId,
              bio: matchingPro.bio,
              phone: matchingPro.phone,
              telegram: matchingPro.telegram,
              photo: matchingPro.photo,
              areas: matchingPro.areas,
              services: matchingPro.services,
            },
          })
          return null
        }
        persist({
          name: email.split("@")[0] || "Resident",
          email,
          phone: "",
          area: "Bole",
          photo: "",
          activeView: "resident",
          professional: null,
        })
        return null
      },
      register({ name, email, password, listTrade }) {
        if (!name.trim()) return "Enter your full name."
        if (!email.includes("@")) return "Enter a valid email address."
        if (password.length < 8) return "Password must be at least 8 characters."
        persist({
          name,
          email,
          phone: "",
          area: "Bole",
          photo: "",
          activeView: listTrade ? "professional" : "resident",
          professional: listTrade ? emptyListing() : null,
        })
        return null
      },
      logout() {
        persist(null)
      },
      updateHousehold(input) {
        if (!session) return
        persist({ ...session, ...input })
      },
      updateProfessional(listing) {
        if (!session) return
        persist({ ...session, professional: listing, phone: listing.phone || session.phone })
      },
      enableProfessional() {
        if (!session) return
        if (session.professional) return
        persist({
          ...session,
          professional: emptyListing(session.photo),
          activeView: "professional",
        })
      },
      setActiveView(view) {
        if (!session) return
        persist({ ...session, activeView: view })
      },
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
