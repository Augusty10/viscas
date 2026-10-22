import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, startIcon, endIcon, disabled, style, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {startIcon && (
          <div className="pointer-events-none absolute left-3.5 z-10 flex items-center justify-center text-slate-400">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          style={{
            paddingLeft: startIcon ? "2.75rem" : "0.875rem",
            paddingRight: endIcon ? "2.75rem" : "0.875rem",
            ...style,
          }}
          className={cn(
            "flex h-11 w-full rounded-xl border border-input bg-white py-2 text-sm text-foreground shadow-xs transition-colors duration-150",
            "placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            error && "border-destructive focus-visible:ring-destructive/30 text-destructive",
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3.5 z-10 flex items-center justify-center text-slate-400">
            {endIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
