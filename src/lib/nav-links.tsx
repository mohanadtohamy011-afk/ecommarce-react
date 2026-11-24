export type NavLink = {
    label: string
    href: string
    children?: NavLink[]

}

export const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
        label: "Categories",
        href: "/categories",
        children: [
            { label: "All Categories", href: "/categories" },
            { label: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
            { label: "Women's Fashion", href: "/products?category=6439d58a0049ad0b52b9003f" },
            { label: "Men's Fashion", href: "/products?category=6439d5b90049ad0b52b90048" },
            { label: "Beauty & Health", href: "/products?category=6439d30b67d9aa4ca97064b1" },
        ],
    },
    { label: "Brands", href: "/brands" },
]
export const accountLinks: NavLink[] = [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
]

export function isActiveLink(pathname: string, href:
    string) {
    const path = href.split("?")[0]
    return path === "/" ? pathname === path : pathname.startsWith(path)
}