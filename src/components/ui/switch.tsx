import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group peer inline-flex h-8 w-14 items-center rounded-full border border-slate-200 dark:border-slate-600 shadow-xs transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        "bg-slate-100 dark:bg-slate-700"
    )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "relative block h-7 w-7 rounded-full bg-white dark:bg-slate-500 shadow transition-transform duration-200",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1"
        )}
      >
        {/* F (visible when checked) */}
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-slate-50 transition-all duration-200 opacity-0 scale-90 group-data-[state=checked]:opacity-100 group-data-[state=checked]:scale-100">
        °F
        </span>

        {/* C (visible when unchecked) */}
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-slate-50 transition-all duration-200 opacity-100 scale-100 group-data-[state=checked]:opacity-0 group-data-[state=checked]:scale-90">
        °C
        </span>
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
