import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CategoryI } from "@/types/category.type"

export default async function CategoriesPage() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    { next: { revalidate: 3600 } },
  )

  if (!response.ok) {
    throw new Error("Unable to load categories")
  }

  const categoryData: { data: CategoryI[] } = await response.json()

  return (
    <main className="container mx-auto px-4 py-10 sm:px-6">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Browse
          </p>
          <h1 className="mt-1 text-3xl font-bold">All Categories</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categoryData.data.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group rounded-xl border border-border/70 bg-card p-4 text-center transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h2 className="mt-3 font-semibold">{category.name}</h2>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
              View Category
              <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
