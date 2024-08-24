import * as React from "react"

import { cn } from "@/shared/shadcn/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full text-white border border-transparent outline-none bg-[#2A2A2A] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-[#666] rounded-xl disabled:cursor-not-allowed disabled:opacity-50 text-[17px] px-3 py-6 placeholder-[#888]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
