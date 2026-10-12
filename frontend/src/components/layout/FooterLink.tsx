import Link from "next/link";
import React from "react";

type FooterLinkProps = {
    href: string;
    children: React.ReactNode;
};

export function FooterLink({
    href,
    children,
}: FooterLinkProps) {
    return (
        <Link
            href={href}
            className="underline-offset-4 hover:underline"
        >
            {children}
        </Link>
    );
}