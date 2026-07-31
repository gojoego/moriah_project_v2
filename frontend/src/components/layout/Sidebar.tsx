import NavItem from "@/components/layout/NavItem"

export default function SideBar() {
    return (
        <aside className="w-64 min-h-screen border-r p-6">
            <h1 className="text-2xl font-bold mb-8">
                Moriah Project Admininstrator 
            </h1>
            <nav className="flex flex-col gap-4">
                <NavItem
                    label="Admin"
                    href="/admin"
                />
                <NavItem
                    label="Users"
                    href="/admin/users"
                />
                <NavItem
                    label="Posts"
                    href="/admin/posts"
                />              
            </nav>
        </aside>
    )
}