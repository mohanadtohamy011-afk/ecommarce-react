import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import AddToCartBtn from "@/components/cart/addTocartBtn"
import { getAllProducts } from "@/services/products.service"
import { ProductI } from "@/types/product.type"

export default async function DealsPage() {
  const response = await getAllProducts()
  const products: ProductI[] = response.data
  const deals = products.filter(
    (product) =>
      product.priceAfterDiscount !== undefined &&
      product.priceAfterDiscount < product.price,
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Save Today
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Today&apos;s Deals</h1>
      </div>

      {deals.length === 0 ? (
        <div className="rounded-xl border p-10 text-center text-muted-foreground">
          No deals are available right now.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {deals.map((product) => {
            const originalPrice = product.price
            const dealPrice = product.priceAfterDiscount!
            const discount = Math.round(
              ((originalPrice - dealPrice) / originalPrice) * 100,
            )

            return (
              <Card
                key={product._id}
                className="group h-full gap-0 overflow-hidden rounded-xl border p-0 shadow-none"
              >
                <Link href={`/products/${product._id}`}>
                  <div className="relative m-3 mb-2 aspect-square overflow-hidden rounded-lg bg-muted/30">
                    <span className="absolute left-2 top-2 z-10 rounded-sm bg-destructive px-2 py-1 text-xs font-semibold text-white">
                      -{discount}%
                    </span>
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
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

                  <div className="mt-2 flex items-center gap-1">
                    <div className="flex">
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
                      <span className="font-semibold text-primary">
                        {dealPrice} EGP
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        {originalPrice} EGP
                      </span>
                    </div>
                    <AddToCartBtn productId={product._id} compact />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </main>
  )
}
