"use client"

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/cart/cartItem";
import OrderSummary from "@/components/cart/orderSummary";
import { clearUserCart, getLoggedUserCart } from "@/actions/cart.actions";
import { useEffect, useState } from "react";
import { CartDataI, CartProductI } from "@/types/cart.type";
import { Spinner } from '@/components/ui/spinner';
import { toast } from "sonner";

// pointer-events-auto overrides the Button default, which would hide the cursor.

export default function CartPage() {
  const [products, setProducts] = useState<CartProductI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cartError, setCartError] = useState<string | null>(null)


  async function getCart() {
    setIsLoading(true)
    setCartError(null)
    try {
      const response: CartDataI = await getLoggedUserCart()
      setProducts(response.data.products)
    } catch (error) {
      console.log(error);
      setCartError("We couldn't load your cart. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function clearCart(){
    try {
      const response = await clearUserCart()
      setProducts(response.data.products)
      toast.success(response.message)
    } catch (error) {
      console.log();
      toast.error("Cart Failed to Clear")
    }
  }

  useEffect(() => {
    getCart()
  }, [])


  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (cartError) {
    return (
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-lg font-semibold">{cartError}</p>
        <Button type="button" className="mt-4" onClick={getCart}>
          Try Again
        </Button>
      </main>
    )
  }

  if (products.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-8 flex size-28 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <ShoppingBag className="size-12" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          Your cart is empty
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>
        <Button asChild size="lg" className="mt-8 gap-2 rounded-xl px-8">
          <Link href="/products">
            Start Shopping
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </main>
    )
  }

  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingCart className="size-6" />
          </span>
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          You have <span className="font-semibold text-primary">1 item</span> in
          your cart
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Cart items */}
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {products.map((product) => <CartItem key={product._id} setProducts={setProducts} product={product} />)}


          <Separator />

          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>
            <Button variant="ghost" className="text-muted-foreground" onClick={clearCart}>
              <Trash2 />
              Clear all items
            </Button>
          </div>
        </div>

        {/* Order summary */}
        <OrderSummary />
      </div>
    </div>
  );
}
