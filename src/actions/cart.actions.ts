"use server"

import { getOurToken } from "@/lib/auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export async function addProductToCart(productId: string) {
    const token = await getOurToken();
    const response = await fetch(`${baseUrl}/api/v2/cart`, {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
            token: token,
            "content-type": "application/json"
        }
    })

    const data = await response.json();
    return data;
}


export async function getLoggedUserCart() {
    const token = await getOurToken();
    const response = await fetch(`${baseUrl}/api/v2/cart`, {
        headers: {
            token: token,
            "content-type": "application/json"
        }
    })

    const data = await response.json();
    return data;
}

export async function removeProductFromCart(productId: string) {
    const token = await getOurToken();
    const response = await fetch(`${baseUrl}/api/v2/cart/${productId}`, {
        method: "DELETE",
        headers: {
            token: token,
            "content-type": "application/json"
        }
    })

    const data = await response.json();
    return data;
}

export async function updateCartProductQuantity(productId: string, count :number) {
    const token = await getOurToken();
    const response = await fetch(`${baseUrl}/api/v2/cart/${productId}`, {
        method: "PUT",
        body:JSON.stringify({count}),
        headers: {
            token: token,
            "content-type": "application/json"
        }
    })

    const data = await response.json();
    return data;
}

export async function clearUserCart() {
    const token = await getOurToken();
    const response = await fetch(`${baseUrl}/api/v2/cart`, {
        method:"DELETE",
        headers: {
            token: token,
            "content-type": "application/json"
        }
    })

    const data = await response.json();
    return data;
}