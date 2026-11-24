import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headset,
  ShieldCheck,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryI } from "@/types/category.type"

export default async function Home() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    { next: { revalidate: 3600 } },
  )

  if (!response.ok) {
    throw new Error("Unable to load categories")
  }

  const categoryData: { data: CategoryI[] } = await response.json()
  const categories = categoryData.data

  return (
    <main>
      <section
        aria-label="Featured promotion"
        className="relative isolate min-h-[300px] overflow-hidden bg-[linear-gradient(90deg,rgba(0,74,45,.88),rgba(0,120,70,.38)),url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center sm:min-h-[250px]"
      >
        <div className="container mx-auto flex min-h-[300px] items-center px-4 sm:min-h-[250px] sm:px-6">
          <div className="max-w-lg text-white">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Fresh Products Delivered
              <br />
              to your Door
            </h1>
            <p className="mt-3 text-sm font-medium text-white/90">
              Get 20% off your first order
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="sm" className="h-9 rounded-md bg-white px-5 text-primary hover:bg-white/90">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="h-9 rounded-md border border-white bg-transparent px-5 text-white hover:bg-transparent hover:text-white">
                <Link href="/deals">View Deals</Link>
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous promotion"
          className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          aria-label="Next promotion"
          className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg"
        >
          <ChevronRight className="size-6" />
        </button>
      </section>

      <section className="border-b bg-card">
        <div className="container mx-auto grid grid-cols-2 divide-x divide-border px-4 sm:grid-cols-4 sm:px-6">
          {[
            { icon: Truck, title: "Free Shipping", detail: "On orders over 500 EGP" },
            { icon: ShieldCheck, title: "Easy Returns", detail: "14-day return policy" },
            { icon: ShieldCheck, title: "Secure Payment", detail: "100% secure checkout" },
            { icon: Headset, title: "24/7 Support", detail: "Contact us anytime" },
          ].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center gap-3 py-4 pl-4 first:pl-0">
              <Icon className="size-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold">{title}</p>
                <p className="text-[10px] text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="border-l-4 border-primary pl-3 text-base font-bold">
            Shop By Category
          </h2>
          <Link
            href="/categories"
            className="text-xs font-medium text-primary hover:underline"
          >
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group min-w-0 text-center"
            >
              <div className="relative mx-auto aspect-square w-full max-w-24 overflow-hidden rounded-xl bg-muted/30">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="96px"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-2 truncate text-xs font-medium">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid gap-4 px-4 pb-10 sm:grid-cols-2 sm:px-6">
        <article className="relative overflow-hidden rounded-lg bg-primary px-6 py-5 text-white">
          <p className="text-[10px] font-bold uppercase">Fresh &amp; Organic</p>
          <h3 className="mt-1 text-lg font-bold">Fresh Organic Fruits</h3>
          <p className="mt-1 text-xs text-white/90">Get up to 40% off on selected organic fruits</p>
          <Link href="/deals" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold">
            Shop Now <ArrowRight className="size-3" />
          </Link>
        </article>
        <article className="relative overflow-hidden rounded-lg bg-orange-500 px-6 py-5 text-white">
          <p className="text-[10px] font-bold uppercase">Daily Savings</p>
          <h3 className="mt-1 text-lg font-bold">Exotic Vegetables</h3>
          <p className="mt-1 text-xs text-white/90">Discover fresh vegetables at great prices</p>
          <Link href="/deals" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold">
            Subscribe <ArrowRight className="size-3" />
          </Link>
        </article>
      </section>
    </main>
  )
}
