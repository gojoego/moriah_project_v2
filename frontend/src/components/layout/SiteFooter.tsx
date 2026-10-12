import { FooterLink } from "@/components/layout/FooterLink";
import { CrisisNotice } from "@/components/layout/CrisisNotice"

export function SiteFooter() {
	return (
		<footer className="border-t">
			<div 
				className="
					mx-auto
					max-w-5xl
					px-4
					py-10
					text-center
					text-sm
					text-muted-foreground
				"
			>
				<p>
					© {new Date().getFullYear()} The Moriah Project
				</p>

				<p className="mt-1">
					Owned and operated by gojoego LLC.
				</p>

				<div 
					className="
						mt-4
						flex
						flex-wrap
						justify-center
						gap-4
					"
				>
					<CrisisNotice/>
					<FooterLink href="/">Home</FooterLink>
					<FooterLink href="/terms">Terms</FooterLink>
					<FooterLink href="/privacy">Privacy</FooterLink>
					<FooterLink href="/community-guidelines">Community Guidelines</FooterLink>
				</div>
			</div>
		</footer>
	);
}
