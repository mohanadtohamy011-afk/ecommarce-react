import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, PackageSearch, Tags } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AddToCartBtn from "@/components/cart/addTocartBtn"
import WishlistButton from "@/components/wishlist/wishlistButton"
import { getBrandById } from "@/services/brands.service"
import { getAllProducts } from "@/services/products.service"
import { ProductI } from "@/types/product.type"

export default async function BrandDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const brand = await getBrandById(id)

  if (!brand) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Tags className="size-9" />
        </div>
        <h1 className="mt-5 text-2xl font-bold">Brand not found</h1>
        <Button asChild className="mt-6">
          <Link href="/brands">
            <ArrowLeft className="size-4" />
            Browse Brands
          </Link>
        </Button>
      </main>
    )
  }

  const response = await getAllProducts(undefined, brand._id)
  const products: ProductI[] = Array.isArray(response.data)
    ? response.data.filter((product) => product.brand?._id === brand._id)
    : []

  return (
    <main>
      <section className="bg-gradient-to-r from-emerald-600 to-green-400 text-white">
        <div className="container mx-auto px-4 py-8 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/brands" className="hover:text-white">Brands</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{brand.name}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/20 p-2 shadow-sm">
              <Image
                src={brand.image}
                alt={`${brand.name} logo`}
                fill
                sizes="56px"
                className="object-contain p-2"
              />
            </span>
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">{brand.name}</h1>
              <p className="mt-1 text-sm text-white/85 sm:text-base">
                Shop {brand.name} products
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto min-h-[50vh] px-4 py-7 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-muted-foreground">Active Filters:</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
            {brand.name}
          </span>
          <Link
            href="/products"
            className="ml-1 text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
          >
            Clear all
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Showing {products.length} {products.length === 1 ? "product" : "products"}
        </p>

        {products.length === 0 ? (
          <div className="flex min-h-[38vh] flex-col items-center justify-center py-12 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <PackageSearch className="size-9" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-bold">No Products Found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No products match your current filters.
            </p>
            <Button asChild className="mt-6">
              <Link href="/products">
                View All Products
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => {
              const hasDiscount =
                product.priceAfterDiscount !== undefined &&
                product.priceAfterDiscount < product.price

              return (
                <Card
                  key={product._id}
                  className="group gap-0 overflow-hidden rounded-xl border p-0 shadow-none"
                >
                  <Link href={`/products/${product._id}`}>
                    <div className="relative m-3 aspect-square overflow-hidden rounded-lg bg-muted/40">
                      {hasDiscount && (
                        <span className="absolute left-2 top-2 z-10 rounded-sm bg-destructive px-2 py-1 text-xs font-semibold text-white">
                          -{Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)}%
                        </span>
                      )}
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-contain p-3 transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col px-4 pb-4">
                    <p className="text-xs text-muted-foreground">
                      {product.category.name}
                    </p>
                    <Link
                      href={`/products/${product._id}`}
                      className="mt-1 line-clamp-2 min-h-10 text-sm font-medium hover:text-primary"
                    >
                      {product.title}
                    </Link>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <span className="font-semibold">
                        {hasDiscount ? product.priceAfterDiscount : product.price} EGP
                      </span>
                      <div className="flex items-center gap-2">
                        <WishlistButton productId={product._id} />
                        <AddToCartBtn productId={product._id} compact />
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
