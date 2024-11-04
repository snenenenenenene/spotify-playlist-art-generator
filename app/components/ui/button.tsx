/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ui/button.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90",
				outline: "border border-gray-200 bg-white shadow-sm hover:bg-gray-100",
				secondary: "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80",
				ghost: "hover:bg-gray-100 hover:text-gray-900",
				link: "text-gray-900 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-10 px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className = "", variant, size, asChild = false, ...props }, ref) => {
		return (
			<button
				className={`${buttonVariants({ variant, size })} ${className}`}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }