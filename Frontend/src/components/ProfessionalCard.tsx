import { Link } from "react-router-dom"
import type { Professional } from "../data/catalog"
import { Chip } from "./Chip"
import { Icon } from "./Icon"

export function ProfessionalCard({ professional }: { professional: Professional }) {
  const initials = professional.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return (
    <article className="flex flex-col rounded-xl border border-outline-variant/40 bg-surface-lowest p-5 shadow-card">
      <div className="flex items-start gap-3">
        {professional.photo ? (
          <img
            src={professional.photo}
            alt=""
            className="h-14 w-14 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary-container text-sm font-semibold text-on-primary">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-primary">{professional.name}</h3>
          <p className="text-sm text-on-variant">
            {professional.profession} · {professional.yearsExperience}+ years
          </p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-on-variant">{professional.bio}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {professional.areas.slice(0, 4).map((area) => (
          <Chip key={area}>{area}</Chip>
        ))}
      </div>
      <p className="mt-3 text-sm text-on-surface">
        {professional.services
          .slice(0, 3)
          .map((service) => service.name)
          .join(" · ")}
      </p>
      <div className="mt-4 flex gap-2 border-t border-outline-variant/30 pt-4">
        <Link
          to={`/professionals/${professional.id}`}
          className="interactive-control inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary-container px-3 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary"
        >
          View profile
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
    </article>
  )
}
