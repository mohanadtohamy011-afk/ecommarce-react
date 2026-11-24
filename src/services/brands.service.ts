import { BrandI } from "@/types/brand.type"

const baseURL = (
  process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
  "https://ecommerce.routemisr.com"
).replace(/\/+$/, "")

interface BrandListResponse {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage?: number
    prevPage?: number
  }
  data: BrandI[]
}

export async function getAllBrands({
  keyword,
  limit = 50,
  page = 1,
}: {
  keyword?: string
  limit?: number
  page?: number
} = {}): Promise<BrandListResponse> {
  const url = new URL(`${baseURL}/api/v1/brands`)
  url.searchParams.set("limit", String(limit))
  url.searchParams.set("page", String(page))
  if (keyword) {
    url.searchParams.set("keyword", keyword)
  }

  const response = await fetch(url, { cache: "no-store" })
  if (!response.ok) {
    throw new Error(`Unable to load brands (HTTP ${response.status})`)
  }

  const data = await response.json()
  return {
    ...data,
    data: Array.isArray(data?.data) ? data.data : [],
  }
}

export async function getAllBrandsAcrossPages(keyword?: string): Promise<BrandI[]> {
  const firstPage = await getAllBrands({ keyword, limit: 50, page: 1 })
  const remainingPages = await Promise.all(
    Array.from(
      { length: Math.max(0, firstPage.metadata.numberOfPages - 1) },
      (_, index) => getAllBrands({ keyword, limit: 50, page: index + 2 }),
    ),
  )

  return [...firstPage.data, ...remainingPages.flatMap((page) => page.data)]
}

export async function getBrandById(id: string): Promise<BrandI | null> {
  const response = await fetch(`${baseURL}/api/v1/brands/${encodeURIComponent(id)}`, {
    cache: "no-store",
  })

  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(`Unable to load brand (HTTP ${response.status})`)
  }

  const result: { data?: BrandI } = await response.json()
  return result.data ?? null
}
