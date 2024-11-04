// components/ui/select.tsx
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"

interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> { }

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className = "", children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={`flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
		{...props}
	>
		{children}
	</SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className = "", children, position = "popper", ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
			position={position}
			{...props}
		>
			<SelectPrimitive.Viewport className="p-1">
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className = "", children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
						fill="currentColor"
						fillRule="evenodd"
						clipRule="evenodd"
					/>
				</svg>
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem }