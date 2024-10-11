import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn.lib'

const buttonVariants = cva(
  `transition-colors
  inline-flex items-center justify-center
  whitespace-nowrap rounded-md text-sm font-medium
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-contrast hover:bg-primary-shade'
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 px-8',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    ></button>
  )
}

Button.displayName = 'Button'

export default Button
export { type buttonVariants }
