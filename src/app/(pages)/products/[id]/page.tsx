import ProductSlider from "@/components/products/productSlider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductDetails } from "@/services/products.service";
import { ProductDetailsI } from "@/types/productDetails.type";
import { Minus, Plus, RotateCcw, Share2, ShieldCheck, ShoppingCart, Star, Truck, Zap } from "lucide-react";
import WishlistButton from "@/components/wishlist/wishlistButton";


export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
const {id} = await params;
console.log(id);
const response = await getProductDetails(id)

const product : ProductDetailsI = response.data;
console.log(response.data );


 
    return (
        <>
      <div className="container mx-auto my-5">
        <div className="bread-crumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="font-black ">
                <BreadcrumbPage>{product.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="carosole col-span-12 lg:col-span-4">
            <div className="rounded-2xl py-0 shadow-sm"><ProductSlider  images={product.images}/></div>
          </div>

          <div className="details col-span-12 lg:col-span-8">
            <Card className="gap-0 rounded-2xl py-0 shadow-sm">
              <CardContent className="space-y-5 p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                 {product.category.name}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {product.brand.name}
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    {product.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <div
                      className="flex items-center text-amber-500"
                      aria-label={`${product.ratingsAverage} out of 5 stars`}
                    >
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 ${
                            star < Math.round(product.ratingsAverage)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">
                      {product.ratingsAverage.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      ( {product.ratingsQuantity} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-heading text-3xl font-bold">
                    {product.price} <span className="text-xl">EGP</span>
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                      product.quantity > 0
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full ${
                        product.quantity > 0 ? "bg-primary" : "bg-destructive"
                      }`}
                    />
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <Separator />

                {/* static part  */}
                <p className="text-sm leading-6 text-muted-foreground">
                  Material Polyester Blend
                  <span className="mx-2 text-border">|</span>
                  Colour Name Beige
                  <span className="mx-2 text-border">|</span>
                  Department Women
                </p>

                {/* static part */}

                <div className="space-y-2">
                  <p className="text-sm font-medium">Quantity</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex h-11 items-center rounded-lg border border-input">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Decrease quantity"
                      >
                        <Minus />
                      </Button>
                      <span className="min-w-10 text-center">1</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Increase quantity"
                      >
                        <Plus />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.quantity} available
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                  <span className="text-sm font-medium">Total Price:</span>
                  <span className="font-heading text-xl font-bold text-primary">
                    {product.price.toFixed(2)} EGP
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    size="lg"
                    className="h-12 gap-2"
                    disabled={product.quantity < 1}
                  >
                    <ShoppingCart />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 gap-2 bg-foreground text-background hover:bg-foreground/90"
                    disabled={product.quantity < 1}
                  >
                    <Zap />
                    Buy Now
                  </Button>
                </div>

                <div className="flex gap-3">
                  <div className="[&>button]:h-12 [&>button]:w-full [&>button]:rounded-md [&>button]:text-sm [&>button]:font-medium">
                    <WishlistButton productId={product._id} />
                  </div>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    className="h-12 w-12"
                    aria-label="Share product"
                  >
                    <Share2 />
                  </Button>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Truck className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Free Delivery</p>
                      <p className="text-xs text-muted-foreground">
                        Orders over $50
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <RotateCcw className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">30 Days Return</p>
                      <p className="text-xs text-muted-foreground">
                        Money back
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Secure Payment</p>
                      <p className="text-xs text-muted-foreground">
                        100% Protected
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>

    )
}
