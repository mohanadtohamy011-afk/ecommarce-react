import { ProductI } from "@/types/product.type"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, PackageSearch, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AddToCartBtn from "@/components/cart/addTocartBtn"
import { getAllProducts } from "@/services/products.service"
import WishlistButton from "@/components/wishlist/wishlistButton"

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string; q?: string }>
}) {
  const { category, brand, q } = await searchParams
  const categoryParam = category?.trim()
  const brandParam = brand?.trim()
  const response = await getAllProducts(categoryParam, brandParam)
  const allProducts: ProductI[] = Array.isArray(response?.data)
    ? response.data
    : []
  const query = q?.trim().toLowerCase()
  const categoryFilter = categoryParam?.toLowerCase()
  const brandFilter = brandParam?.toLowerCase()

  const products = allProducts.filter((product) => {
    const matchesCategory =
      !categoryFilter ||
      product.category._id.toLowerCase() === categoryFilter ||
      product.category.slug.toLowerCase() === categoryFilter ||
      product.category.name.toLowerCase().replaceAll(" ", "-") === categoryFilter ||
      product.category.name.toLowerCase().replaceAll("&", "and").replaceAll(" ", "-") === categoryFilter
    const matchesBrand =
      !brandFilter ||
      product.brand._id.toLowerCase() === brandFilter ||
      product.brand.slug.toLowerCase() === brandFilter ||
      product.brand.name.toLowerCase() === brandFilter
    const matchesSearch =
      !query ||
      product.title.toLowerCase().includes(query) ||
      product.category.name.toLowerCase().includes(query)

    return matchesCategory && matchesBrand && matchesSearch
  })

  if (products.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <PackageSearch className="size-11" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">
            No products found
          </h1>
          <p className="mt-3 text-muted-foreground">
            {brandParam
              ? "We couldn’t find any products from this brand."
              : categoryParam
              ? "We couldn’t find any products in this category."
              : "We couldn’t find any products matching your search."}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <Link href="/categories">
                <ArrowLeft className="size-4" />
                All Categories
              </Link>
            </Button>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
        {products.map((product) => {
          const discountedPrice = product.priceAfterDiscount
          const hasDiscount =
            discountedPrice !== undefined && discountedPrice < product.price

          return (
            <Card
              key={product._id}
              className="group relative h-full gap-0 overflow-hidden rounded-xl border bg-card p-0 shadow-none ring-1 ring-border/70 transition-shadow hover:shadow-md"
            >
              <Link
                href={`/products/${product._id}`}
                aria-label={`View ${product.title}`}
              >
                <div className="relative m-3 mb-2 aspect-square overflow-hidden rounded-lg bg-muted/40">
                  {hasDiscount && (
                    <span className="absolute left-2 top-2 z-10 rounded-sm bg-destructive px-2 py-1 text-xs font-semibold text-white">
                      -{Math.round(((product.price - discountedPrice) / product.price) * 100)}%
                    </span>
                  )}
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col px-4 pb-4">
                <p className="text-xs text-muted-foreground">
                  {product.category.name}
                </p>
                <Link
                  href={`/products/${product._id}`}
                  className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-5 hover:text-primary"
                >
                  {product.title}
                </Link>

                <div
                  className="mt-2 flex items-center gap-1"
                  aria-label={`${product.ratingsAverage} out of 5 stars, ${product.ratingsQuantity} reviews`}
                >
                  <div className="flex items-center" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className={`size-4 ${
                          star < Math.round(product.ratingsAverage)
                            ? "fill-amber-400 text-amber-400"
                            : "text-amber-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity})
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                    <span
                      className={`font-semibold ${
                        hasDiscount ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {hasDiscount ? discountedPrice : product.price} EGP
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-muted-foreground line-through">
                        {product.price} EGP
                      </span>
                    )}
                  </div>
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
    </main>
  )
}
