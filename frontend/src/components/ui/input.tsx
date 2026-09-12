import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
	className,
  	type,
  	...props
}: React.ComponentProps<"input">) {
  return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"h-10",
				"w-full",
				"min-w-0",
				"rounded-md",
				"px-3 py-2",
				"border border-border",
				"bg-card",
				"text-card-foreground",
				"placeholder:text-muted-foreground",
				"text-base md:text-sm",
				"shadow-xs",
				"outline-none",
				"transition-[color,box-shadow]",
				"focus-visible:border-ring",
				"focus-visible:ring-2",
				"focus-visible:ring-ring/50",
				"disabled:pointer-events-none",
				"disabled:cursor-not-allowed",
				"disabled:opacity-50",
				"aria-invalid:border-destructive",
				"aria-invalid:ring-destructive/20",
				"file:inline-flex",
				"file:h-7",
				"file:border-0",
				"file:bg-transparent",
				"file:text-sm",
				"file:font-medium",
				"file:text-foreground",
				"selection:bg-primary",
				"selection:text-primary-foreground",
				className
			)}
			{...props}
		/>
  );
}

export { Input };