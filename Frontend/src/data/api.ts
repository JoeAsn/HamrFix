import { CATEGORIES, type Professional } from "./catalog"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

type ApiProfessional = Omit<Partial<Professional>, "areas" | "services"> & {
  id: number | string
  name: string
  profession?: string
  areas?: Array<{ name: string; is_primary: boolean; isPrimary?: boolean }>
  services?: Array<{ id: number | string; name: string; description?: string }>
}
type BrowseResponse = { professionals: ApiProfessional[]; nextCursor: string | null }
type BrowsePage = { professionals: Professional[]; nextCursor: string | null }
type ProfessionalDetailsResponse =
  | { success: false; message: string }
  | {
      name: string
      profession: string
      overview: string | null
      contact_phone: string
      telegram: string | null
      professional_photo: string | null
      services: Array<{ name: string; details: string | null }>
      areas: Array<{ name: string; is_primary: boolean }>
    }

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    const error = new Error(response.status === 404 ? "not-found" : "request-failed")
    throw error
  }
  return response.json() as Promise<T>
}

export async function browseProfessionals(params: URLSearchParams): Promise<BrowsePage> {
  const query = new URLSearchParams()
  const name = params.get("q")
  const mode = params.get("mode") ?? "services"
  if (name && mode === "professionals") query.set("name", name)
  if (name && mode === "services") query.set("service", name)
  const category = params.get("category")
  if (category) {
    const categoryRecord = CATEGORIES.find((item) => item.id === category)
    if (!categoryRecord) throw new Error("unknown-category")
    query.set("category", categoryRecord.name)
  }
  const location = params.get("area")
  if (location) query.set("location", location)
  const cursor = params.get("cursor")
  if (cursor) query.set("cursor", cursor)
  query.set("limit", "4")
  const { professionals, nextCursor } = await request<BrowseResponse>(`/api/professionals/browse?${query}`)
  return {
    professionals: professionals.map((professional) => ({
      ...professional,
      id: String(professional.id),
      profession: professional.profession ?? "Service professional",
      categoryId: professional.categoryId ?? "plumbing",
      bio: professional.bio ?? "",
      areas: (professional.areas ?? []).map((area) => ({ name: area.name, isPrimary: area.isPrimary ?? area.is_primary })),
      services: (professional.services ?? []).map((service) => ({ ...service, id: String(service.id) })),
      phone: professional.phone ?? "",
      telegram: professional.telegram ?? "",
      photo: professional.photo ?? "",
    })),
    nextCursor,
  }
}

export async function getProfessionalDetails(id: string): Promise<Professional> {
  const professional = await request<ProfessionalDetailsResponse>(`/api/professional/${encodeURIComponent(id)}`)
  if ("message" in professional) {
    const message = professional.message.toLowerCase()
    const isNotFound = message.includes("does not exist") || message.startsWith("invalid")
    throw new Error(isNotFound ? "not-found" : "request-failed")
  }

  return {
    id,
    name: professional.name,
    profession: professional.profession,
    categoryId: "plumbing",
    bio: professional.overview ?? "",
    services: professional.services.map((service, index) => ({
      id: `${id}-service-${index}`,
      name: service.name,
      description: service.details ?? "",
    })),
    phone: professional.contact_phone,
    telegram: professional.telegram ?? "",
    photo: professional.professional_photo ?? "",
    areas: professional.areas.map((area) => ({ name: area.name, isPrimary: area.is_primary })),
  }
}
