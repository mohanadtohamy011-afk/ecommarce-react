"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Headset,
  Heart,
  Leaf,
  Menu,
  PhoneCall,
  Search,
  ShoppingCart,
  UserRound,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { isActiveLink, navLinks } from "@/lib/nav-links";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";

export default function Navbar() {

  const session = useSession()
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  function sinOutuser(){
    signOut({redirect:true , callbackUrl:"/login"})
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center gap-3 sm:gap-5">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            aria-label="FreshCart home"
          >
            <Leaf className="size-7 text-primary" aria-hidden="true" />
            <span>
              Fresh<span className="text-primary">Cart</span>
            </span>
          </Link>

          <form
            action="/products"
            role="search"
            className="hidden min-w-0 flex-1 md:flex"
          >
            <label htmlFor="desktop-product-search" className="sr-only">
              Search products
            </label>
            <div className="flex h-11 w-full max-w-xl items-center overflow-hidden rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring/40">
              <input
                id="desktop-product-search"
                type="search"
                name="q"
                placeholder="Search for products"
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="icon"
                className="mr-1 size-9 rounded-md"
                aria-label="Search products"
              >
                <Search className="size-4" />
              </Button>
            </div>
          </form>

          <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
            <Headset className="size-7 text-primary" aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-sm font-semibold">24/7 Help</p>
              <p className="text-xs text-muted-foreground">
                Customer support
              </p>
            </div>
            <PhoneCall
              className="ml-1 size-5 text-muted-foreground"
              aria-hidden="true"
            />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1 lg:ml-0">
            
            

            {session.status === "loading" ? (
              <Spinner />
            ) : session.status === "authenticated" ? (
              <>
                <Button asChild variant="ghost" size="icon">
                  <Link href="/wishlist" aria-label="Wishlist" title="Wishlist">
                    <Heart className="size-5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <Link href="/cart" aria-label="Cart" title="Cart">
                    <ShoppingCart className="size-5" />
                  </Link>
                  </Button>
                <Button asChild variant="ghost" size="icon">
                  <Link href="/userpage" aria-label="Account" title="Account">
                    <UserRound className="size-5" />
                  </Link>
                </Button>
                <Button type="button" onClick={sinOutuser} variant="destructive">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="hidden sm:flex">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="hidden sm:flex">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>

        <form action="/products" role="search" className="pb-3 md:hidden">
          <label htmlFor="mobile-product-search" className="sr-only">
            Search products
          </label>
          <div className="flex h-10 w-full items-center overflow-hidden rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring/40">
            <input
              id="mobile-product-search"
              type="search"
              name="q"
              placeholder="Search for products"
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              size="icon"
              className="mr-1 size-8 rounded-md"
              aria-label="Search products"
            >
              <Search className="size-4" />
            </Button>
          </div>
        </form>

        <nav aria-label="Main navigation" className="hidden border-t md:block">
          <ul className="flex items-center gap-8 py-3">
            {navLinks.map(({ label, href }) => {
              const active = isActiveLink(pathname, href);

              return (
                <li key={href}>
                  {label === "Categories" ? (
                    <div className="group relative py-1">
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${active ? "text-primary" : "text-muted-foreground"}`}
                      >
                        Categories
                        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                      </Link>
                      <div className="invisible absolute left-0 top-full z-50 w-52 translate-y-2 rounded-md border bg-card py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        {navLinks.find((link) => link.label === "Categories")?.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-medium transition-colors hover:text-primary ${active ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    {label}
                  </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${menuOpen ? "block" : "hidden"} border-t px-4 py-3 md:hidden`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1">
          {navLinks.map(({ label, href }) => {
            const active = isActiveLink(pathname, href);

            return (
              <li key={href}>
                {label === "Categories" ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setCategoryMenuOpen((open) => !open)}
                      aria-expanded={categoryMenuOpen}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-primary ${active ? "text-primary" : "text-muted-foreground"}`}
                    >
                      Categories
                      <ChevronDown className={`size-4 transition-transform ${categoryMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                    {categoryMenuOpen && (
                      <ul className="ml-3 border-l pl-3">
                        {navLinks.find((link) => link.label === "Categories")?.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => {
                                setCategoryMenuOpen(false)
                                setMenuOpen(false)
                              }}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-primary ${active ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {label}
                </Link>
                )}
              </li>
            );
          })}
          <li className="mt-2 flex items-center gap-3 border-t px-3 pt-3">
            <Headset className="size-6 text-primary" aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-sm font-semibold">24/7 Help</p>
              <p className="text-xs text-muted-foreground">
                Customer support
              </p>
            </div>
            <PhoneCall
              className="ml-auto size-5 text-muted-foreground"
              aria-hidden="true"
            />
          </li>
          <li className="flex gap-2 px-3 pt-3">
            {session.status === "loading" ? <Spinner /> : session.status === "authenticated" ? <>
              <Button onClick={sinOutuser} variant="destructive">Logout</Button>
            </> : <>

            
              <Button asChild variant="outline" className="flex-1">
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </Button>
            </>}

          </li>
        </ul>
      </nav>
    </header>
  );
}