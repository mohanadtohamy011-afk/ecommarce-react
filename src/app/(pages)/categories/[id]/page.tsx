import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryI } from "@/types/category.type"

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    { cache: "no-store" },
  )

  if (!response.ok) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Button asChild className="mt-6">
          <Link href="/categories">
            <ArrowLeft className="size-4" />
            Back to Categories
          </Link>
        </Button>
      </main>
    )
  }

  const result: { data: CategoryI } = await response.json()
  const category = result.data

  return (
    <main className="container mx-auto px-4 py-10 sm:px-6">
      <Link
        href="/categories"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        All Categories
      </Link>

      <section className="grid items-center gap-8 rounded-2xl border bg-card p-6 md:grid-cols-2 md:p-10">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-xl bg-muted/30">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Category
          </p>
          <h1 className="mt-2 text-3xl font-bold">{category.name}</h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Browse all products available in {category.name}.
          </p>
          <Button asChild className="mt-6">
            <Link href={`/products?category=${encodeURIComponent(category.slug)}`}>
              View Products
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
