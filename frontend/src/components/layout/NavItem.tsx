interface NavItemProps {
    label: string;
    href: string;
}

export default function NavItem({
    label, 
    href
}: NavItemProps) {
    return (
        <a 
            href={href}
            className="
                flex
                items-center
                gap-2
                px-4
                py-3
                rounded-lg
                hover:bg-gray-100
            "
        >
            {label}
        </a>
    )
}