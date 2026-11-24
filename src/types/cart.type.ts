import { ProductI } from "./product.type"

export interface CartDataI {
status: string
message: string
numOfCartItems: number
cartId: string
data: Data
}

export interface Data {
_id: string
cartOwner: string
products: CartProductI[]
createdAt: string
updatedAt: string
_v: number
totalCartPrice: number
}

export interface CartProductI {
count: number
_id: string
product: ProductI
price: number
}