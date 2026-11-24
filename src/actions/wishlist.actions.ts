"use server"

import { getOurToken } from "@/lib/auth"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function getLoggedUserWishlist() {
  const token = await getOurToken()
  const response = await fetch(`${baseUrl}/api/v1/wishlist`, {
    headers: {
      token,
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Unable to load wishlist")
  }
  return data
}

export async function addProductToWishlist(productId: string) {
  const token = await getOurToken()
  const response = await fetch(`${baseUrl}/api/v1/wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token,
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Unable to add product to wishlist")
  }
  return data
}

export async function removeProductFromWishlist(productId: string) {
  const token = await getOurToken()
  const response = await fetch(
    `${baseUrl}/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
  )

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Unable to remove product from wishlist")
  }
  return data
}
