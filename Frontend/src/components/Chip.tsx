type ChipProps = {
  children: string
  active?: boolean
  onClick?: () => void
}

export function Chip({ children, active, onClick }: ChipProps) {
  const className = active
    ? "bg-primary-container text-on-primary"
    : "bg-surface-low text-primary-container border border-outline-variant/40"

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-xs font-semibold ${className}`}
      >
        {children}
      </button>
    )
  }

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
      {children}
    </span>
  )
}
