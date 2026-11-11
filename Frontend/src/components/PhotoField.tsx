import { Avatar } from "./Avatar"

type PhotoFieldProps = {
  name: string
  photo: string
  onChange: (photo: string) => void
  label?: string
}

export function PhotoField({ name, photo, onChange, label = "Profile photo" }: PhotoFieldProps) {
  function onFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => onChange(String(reader.result ?? ""))
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Avatar name={name} photo={photo} size="lg" />
        <div className="flex flex-col gap-2">
          <label className="inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-surface-low px-4 py-2 text-sm font-semibold text-primary">
            Upload photo
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => onFile(event.target.files?.[0])}
            />
          </label>
          {photo ? (
            <button
              type="button"
              className="text-left text-sm font-semibold text-error"
              onClick={() => onChange("")}
            >
              Remove photo
            </button>
          ) : (
            <p className="text-xs text-on-variant">PNG or JPG. Shown on your account and listings.</p>
          )}
        </div>
      </div>
    </div>
  )
}
