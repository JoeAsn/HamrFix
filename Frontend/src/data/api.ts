import { CATEGORIES, type Professional } from "./catalog"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

type ApiProfessional = Omit<Partial<Professional>, "areas" | "services"> & {
  id: number | string
  name: string
  profession?: string
  areas?: Array<{ name: string; is_primary: boolean; isPrimary?: boolean }>
  services?: Array<{ id: number | string; name: string; description?: string }>
}
type BrowseResponse = { professionals: ApiProfessional[] }
type ProfessionalResponse = { professional: ApiProfessional }

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    const error = new Error(response.status === 404 ? "not-found" : "request-failed")
    throw error
  }
  return response.json() as Promise<T>
}

export async function browseProfessionals(params: URLSearchParams): Promise<Professional[]> {
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
  query.set("limit", "50")
  const { professionals } = await request<BrowseResponse>(`/api/professionals/browse?${query}`)
  return professionals.map((professional) => ({
    ...professional,
    id: String(professional.id),
    profession: professional.profession ?? "Service professional",
    bio: professional.bio ?? "",
    areas: (professional.areas ?? []).map((area) => ({ name: area.name, isPrimary: area.isPrimary ?? area.is_primary })),
    services: (professional.services ?? []).map((service) => ({ ...service, id: String(service.id) })),
    phone: professional.phone ?? "",
    telegram: professional.telegram ?? "",
    photo: professional.photo ?? "",
  }))
}

export async function getProfessionalDetails(id: string): Promise<Professional> {
  const { professional } = await request<ProfessionalResponse>(`/api/professionals/${encodeURIComponent(id)}`)
  return {
    ...professional,
    id: String(professional.id),
    profession: professional.profession ?? "Service professional",
    bio: professional.bio ?? "",
    services: (professional.services ?? []).map((service) => ({ ...service, id: String(service.id) })),
    phone: professional.phone ?? "",
    telegram: professional.telegram ?? "",
    photo: professional.photo ?? "",
    areas: (professional.areas ?? []).map((area) => ({ name: area.name, isPrimary: area.isPrimary ?? area.is_primary })),
  }
}
