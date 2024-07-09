import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { inputVariants } from '@/lib/variants'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export interface InputIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ElementType
}

const InputIcon = React.forwardRef<HTMLInputElement, InputIconProps>(
  ({ className, type, icon, ...props }, ref) => {
    const Icon = icon
    return (
      <div className="relative">
        <Input
          type={type}
          className={cn(inputVariants({ variant: 'icon' }), className)}
          ref={ref}
          {...props}
        />
        <Icon className="size-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2"></Icon>
      </div>
    )
  }
)
InputIcon.displayName = 'InputIcon'

export { Input, InputIcon }
