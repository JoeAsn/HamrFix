type AvatarProps = {
  name: string
  photo?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg sm:h-24 sm:w-24 sm:text-2xl",
}

export function Avatar({ name, photo, size = "md", className = "" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary ${sizes[size]} ${className}`}
    >
      {initials || "?"}
    </div>
  )
}
