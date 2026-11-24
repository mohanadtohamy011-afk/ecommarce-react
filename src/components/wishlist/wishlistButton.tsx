"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/actions/wishlist.actions"

export default function WishlistButton({
  productId,
  initialSaved = false,
}: {
  productId: string
  initialSaved?: boolean
}) {
  const { status } = useSession()
  const router = useRouter()
  const [saved, setSaved] = useState(initialSaved)
  const [isLoading, setIsLoading] = useState(false)

  async function toggleWishlist() {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    setIsLoading(true)
    try {
      if (saved) {
        const response = await removeProductFromWishlist(productId)
        setSaved(false)
        toast.success(response.message || "Removed from wishlist")
      } else {
        const response = await addProductToWishlist(productId)
        setSaved(true)
        toast.success(response.message || "Added to wishlist")
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update your wishlist",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      disabled={isLoading}
      onClick={toggleWishlist}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      className="size-10 shrink-0 rounded-full"
    >
      <Heart
        className={`size-5 ${saved ? "fill-primary text-primary" : ""}`}
      />
    </Button>
  )
}
