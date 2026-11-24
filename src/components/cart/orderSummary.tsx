import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Lock, ShoppingBag, Tag, Truck } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

export default function OrderSummary() {
    return (
        <>
            <div className="col-span-12 lg:col-span-4">
          <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
            <div className="bg-primary p-5 text-primary-foreground">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag className="size-5" />
                Order Summary
              </h2>
              <p className="mt-1 text-sm">1 item in your cart</p>
            </div>

            <CardContent className="space-y-4 p-5">
              <div className="space-y-2 rounded-xl bg-orange-50 p-4">
                <p className="flex items-center gap-2 text-sm">
                  <Truck className="size-4 text-orange-500" />
                  Add 202 EGP for free shipping
                </p>
                <div className="h-2 rounded-full bg-orange-100">
                  <div className="h-full w-[60%] rounded-full bg-orange-500" />
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>298 EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>50 EGP</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold">
                  348{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    EGP
                  </span>
                </span>
              </div>

              <Button variant="outline" className="h-12 w-full border-dashed">
                <Tag/>
                Apply Promo Code
              </Button>

              <Button size="lg" className="h-12 w-full">
                <Lock />
                Secure Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
        </>
    )
}
