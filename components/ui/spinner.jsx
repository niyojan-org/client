import { IconLoader } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }) {
  return (
    <IconLoader
      role="status"
      aria-label="Loading"
      className={cn("size-10 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  )
}
