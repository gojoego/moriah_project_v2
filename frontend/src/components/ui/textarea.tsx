import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
	className,
	...props
}: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"

			className={cn(
				"w-full",
				"min-w-0",
				"min-h-24",
				"rounded-md px-3 py-2",
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
				"disabled:cursor-not-allowed",
				"disabled:opacity-50",
				"aria-invalid:border-destructive",
				"aria-invalid:ring-destructive/20",
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };