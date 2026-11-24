import { BrandI } from "./brand.type"
import { CategoryI } from "./category.type"
import { SubcategoryI } from "./subCategories.type"

export interface ProductDetailsI {
sold: number
images: string[]
subcategory: SubcategoryI[]
ratingsQuantity: number
_id  : string
title: string
slug: string
description: string
quantity: number
price: number
priceAfterDiscount: number
imageCover: string
category: CategoryI
brand: BrandI
ratingsAverage: number
createdAt: string
updatedAt : string
_v: number
reviews: Review[]
id : string
}

export interface Review {
_id: string
review: string
rating: number
product: string
user: User
createdAt: string
updatedAt: string
_v: number
}

export interface User {
_id: string
name: string
}