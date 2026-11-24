"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Heart, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AddToCartBtn from "@/components/cart/addTocartBtn"
import {
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "@/actions/wishlist.actions"
import { ProductI } from "@/types/product.type"

interface WishlistResponse {
  data: ProductI[]
  message?: string
}

export default function WishListPage() {
  const { status } = useSession()
  const [products, setProducts] = useState<ProductI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function getWishlist() {
    setIsLoading(true)
    setError(null)
    try {
      const response: WishlistResponse = await getLoggedUserWishlist()
      setProducts(response.data)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "We couldn't load your wishlist. Please try again.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status !== "authenticated") {
      return
    }

    let cancelled = false

    async function loadWishlist() {
      try {
        const response: WishlistResponse = await getLoggedUserWishlist()
        if (!cancelled) {
          setProducts(response.data)
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "We couldn't load your wishlist. Please try again.",
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadWishlist()

    return () => {
      cancelled = true
    }
  }, [status])

  async function removeProduct(productId: string) {
    try {
      const response = await removeProductFromWishlist(productId)
      setProducts((current) =>
        current.filter((product) => product._id !== productId),
      )
      toast.success(response.message || "Removed from wishlist")
    } catch (removeError) {
      toast.error(
        removeError instanceof Error
          ? removeError.message
          : "Unable to remove product from wishlist",
      )
    }
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-8 flex size-28 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Heart className="size-12" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          Your wishlist is empty
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Browse products and save your favorites here. Sign in to sync your wishlist across devices.
        </p>
        <Button asChild size="lg" className="mt-8 w-full max-w-md gap-2 rounded-xl">
          <Link href="/products">
            Browse Products
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="mt-3 w-full max-w-md rounded-xl">
          <Link href="/login">Sign In</Link>
        </Button>
      </main>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (error) {
    return (
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-lg font-semibold">{error}</p>
        <Button type="button" className="mt-4" onClick={getWishlist}>
          Try Again
        </Button>
      </main>
    )
  }

  if (products.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-8 flex size-28 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Heart className="size-12" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          Your wishlist is empty
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Browse products and save your favorites here.
        </p>
        <Button asChild size="lg" className="mt-8 gap-2 rounded-xl px-8">
          <Link href="/products">
            Browse Products
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Wishlist</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
          <Heart className="size-6 fill-red-500" aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-heading text-3xl font-bold">My Wishlist</h1>
          <p className="mt-1 text-muted-foreground">
            {products.length} {products.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="hidden grid-cols-[minmax(300px,2fr)_1fr_1fr_1.4fr] items-center border-b px-6 py-4 text-sm font-medium text-muted-foreground md:grid">
          <span>Product</span>
          <span>Price</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {products.map((product) => {
          const price = product.priceAfterDiscount || product.price

          return (
            <article
              key={product._id}
              className="grid gap-4 border-b px-4 py-5 last:border-b-0 md:grid-cols-[minmax(300px,2fr)_1fr_1fr_1.4fr] md:items-center md:px-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <Link
                  href={`/products/${product._id}`}
                  className="relative size-20 shrink-0 overflow-hidden rounded-lg border bg-muted/30"
                >
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </Link>
                <div className="min-w-0">
                  <Link
                    href={`/products/${product._id}`}
                    className="block truncate text-base font-medium hover:text-primary"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.category.name}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground md:hidden">Price</p>
                <p className="font-semibold">{price} EGP</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground md:hidden">Status</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <div className="w-36 [&>button]:h-10 [&>button]:w-full [&>button]:gap-2 [&>button]:rounded-lg">
                  <AddToCartBtn productId={product._id} />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-10 shrink-0 rounded-lg"
                  aria-label={`Remove ${product.title} from wishlist`}
                  onClick={() => removeProduct(product._id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </article>
          )
        })}
      </div>

      <Link
        href="/products"
        className="mt-6 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Continue Shopping
      </Link>
    </main>
  )
}
