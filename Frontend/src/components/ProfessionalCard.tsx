import { useNavigate } from "react-router-dom"
import type { Professional } from "../data/catalog"
import { Icon } from "./Icon"

export function ProfessionalCard({ professional }: { professional: Professional }) {
  const navigate = useNavigate()
  const initials = professional.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return (
    <article role="link" tabIndex={0} onClick={() => navigate(`/professionals/${professional.id}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") navigate(`/professionals/${professional.id}`) }} className="flex cursor-pointer flex-col rounded-xl border border-outline-variant/40 bg-surface-lowest p-5 shadow-card">
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
            {professional.profession}
          </p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-on-variant">{professional.bio}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {professional.areas.slice(0, 3).map((area) => (
          <span key={area.name} className={`inline-flex min-h-8 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${area.isPrimary ? "bg-primary-container text-on-primary" : "border border-outline-variant/40 bg-surface-low text-primary-container"}`}>
            {area.isPrimary ? <span className="material-symbols-outlined text-[14px]" aria-hidden="true">star</span> : null}
            {area.name}{area.isPrimary ? <span className="ml-0.5">· Primary</span> : null}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm text-on-surface">
        {professional.services
          .slice(0, 3)
          .map((service) => service.name)
          .join(" · ")}
      </p>
      <div className="mt-4 flex gap-2 border-t border-outline-variant/30 pt-4">
        <span className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary-container px-3 py-2.5 text-sm font-semibold text-on-primary">
          View profile
          <Icon name="arrow_forward" className="text-[16px]" />
        </span>
      </div>
    </article>
  )
}
