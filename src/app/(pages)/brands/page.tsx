import Image from "next/image"
import Link from "next/link"
import { Search, Tags } from "lucide-react"
import { BrandI } from "@/types/brand.type"
import { getAllBrandsAcrossPages } from "@/services/brands.service"
import { Button } from "@/components/ui/button"

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>
}) {
  const params = await searchParams
  const keyword = params.keyword?.trim() || ""

  let brands: BrandI[] = []
  let error: string | null = null

  try {
    brands = await getAllBrandsAcrossPages(keyword)
  } catch (loadError) {
    error = loadError instanceof Error
      ? loadError.message
      : "Unable to load brands right now."
  }

  return (
    <main>
      <section className="bg-gradient-to-r from-violet-600 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-12">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Brands</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-xl bg-white/20 shadow-sm">
              <Tags className="size-7" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">Top Brands</h1>
              <p className="mt-1 text-sm text-white/85 sm:text-base">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 sm:px-6 sm:py-10">
        <form action="/brands" className="mb-6 flex w-full max-w-lg gap-2">
          <label htmlFor="brand-keyword" className="sr-only">Search brands</label>
          <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border bg-background px-3 focus-within:ring-2 focus-within:ring-ring/40">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              id="brand-keyword"
              name="keyword"
              type="search"
              defaultValue={keyword}
              placeholder="Search brands"
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <Button type="submit" className="h-11">Search</Button>
        </form>

        {error ? (
          <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="font-medium">{error}</p>
          </div>
        ) : brands.length === 0 ? (
          <div className="rounded-xl border bg-card px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">No brands found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="group rounded-2xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-5"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/50 p-4">
                  <div className="relative size-full bg-white">
                    <Image
                      src={brand.image}
                      alt={`${brand.name} logo`}
                      fill
                      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <h2 className="mt-3 truncate text-center text-sm font-medium group-hover:text-primary">
                  {brand.name}
                </h2>
              </Link>
            ))}
          </div>
        )}

      </section>
    </main>
  )
}
