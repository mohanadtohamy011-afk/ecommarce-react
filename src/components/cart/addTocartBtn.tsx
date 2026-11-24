"use client"

import { addProductToCart } from '@/actions/cart.actions'
import { Button } from '../ui/button'
import { toast } from 'sonner';
import { useState } from 'react';
import { Spinner } from '../ui/spinner';
import { Plus, ShoppingCart } from 'lucide-react';

export default function AddToCartBtn({
    productId,
    compact = false,
}: {
    productId: string
    compact?: boolean
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function addToCart() {
        if (!productId) {
            toast.error("This product cannot be added to the cart")
            return
        }

        setIsLoading(true)
        try {
            const response = await addProductToCart(productId)
            toast.success(response.message || "Product added to your cart")
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Unable to add the product to your cart"
            toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            type="button"
            onClick={addToCart}
            disabled={isLoading}
            aria-label="Add to cart"
            className={compact ? "size-10 shrink-0 rounded-full p-0" : "w-full"}
        >
            {isLoading ? (
                <Spinner />
            ) : compact ? (
                <Plus className="size-5" />
            ) : (
                <>
                    <ShoppingCart className="size-4" />
                    Add To Cart
                </>
            )}
        </Button>
    )
}