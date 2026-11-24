import { ProductI } from "@/types/product.type"

const baseURL = (
    process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
    "https://ecommerce.routemisr.com"
).replace(/\/+$/, "");

export async function getAllProducts(
    categoryId?: string,
    brandId?: string,
): Promise<{ data: ProductI[]; results: number }> {
    const params = new URLSearchParams()
    if (categoryId) params.set("category", categoryId)
    if (brandId) params.set("brand", brandId)
    const query = params.size > 0 ? `?${params.toString()}` : ""
    try {
        const response = await fetch(`${baseURL}/api/v1/products${query}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            return { data: [], results: 0 };
        }

        const data = await response.json();
        return {
            ...data,
            data: Array.isArray(data?.data) ? data.data as ProductI[] : [],
            results: typeof data?.results === "number" ? data.results : 0,
        };
    } catch {
        return { data: [], results: 0 };
    }
}


export async function getProductDetails(productId:string) {

    const response = await fetch(`${baseURL}/api/v1/products/${productId}`
      
    );

    const data = await response.json(); 
    return data;
}