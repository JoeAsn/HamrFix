import type { CategoryId, SubCity } from "../data/catalog"
import type { ServiceOffering } from "../data/catalog"

export type AccountView = "resident" | "professional"

export type ProfessionalListing = {
  profession: string
  categoryId: CategoryId
  bio: string
  phone: string
  telegram: string
  photo: string
  areas: SubCity[]
  services: ServiceOffering[]
}

export type Session = {
  name: string
  email: string
  phone: string
  area: SubCity | ""
  photo: string
  activeView: AccountView
  professional: ProfessionalListing | null
}
