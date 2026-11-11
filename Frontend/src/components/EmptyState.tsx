import { Icon } from "./Icon"

type EmptyStateProps = {
  title: string
  body: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-outline-variant bg-surface-lowest p-5 text-center sm:p-8">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-low text-primary-container">
        <Icon name="search_off" className="text-[24px]" />
      </div>
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <p className="mt-1 text-sm text-on-variant">{body}</p>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="interactive-control mt-4 rounded-lg bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary"
        >
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
