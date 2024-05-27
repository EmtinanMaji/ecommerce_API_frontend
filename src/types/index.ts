// //api call from here

// //category
export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  createdAt: string
  products?: Product[]
}

export type CategoryState = {
  categories: Category[]
  totalPages: number
  category: Category | null
  error: null | string
  isLoading: boolean
}
// //products
export type Product = {
  orderQuantity: number
  productId: string
  name: string
  slug: string
  imageUrl?: string
  description: string
  price: number
  quantity: number
  sold: number
  shipping: number
  categoryId: string
  createdAt: string
  category: Category
}

export type ProductState = {
  products: Product[]
  totalPages: number
  product: Product | null
  error: null | string
  isLoading: boolean
}

// //User
export type User = {
  userId?: string
  name: string
  email: string
  password: string
  address: string
  image?: string
  isAdmin?: boolean
  isBanned?: boolean
  createdAt?: string
  //order: Order[]
}

export type UserState = {
  users: User[]
  totalPages: number
  error: null | string
  isLoading: boolean
  userData: null | User
  token: null | string
  isLoggedIn: boolean
}
export type LoginFormData = {
  email: string
  password: string
}

export type LoginData = {
  isLoggedIn: boolean
  userData: User | null
  token: string
}

// export type CustomError = {
//   massage: string
// }

export type RegisterFormData = {
  name: string
  email: string
  password: string
  image: FileList
  phone: string
  address: string
}

export type UpdateProfileFormData = {
  name: string
  address: string
}

export type CreateProductFormData = {
  name: string
  imageUrl: FileList
  description: string
  price: number
  quantity: number
  sold: number
  shipping: number
  categoryId: string
}
export type CreateProductForBackend = {
  name: string
  imageUrl: string
  description: string
  price: number
  quantity: number
  shipping: number
  categoryId: string
}
export type CreateCategoryFormData = {
  name: string
  description: string
}

export type CartItem = Product & { orderQuantity: number }

export type CartState = {
  cartItems: Product[]
}

export type Order = {
  orderId: string
  userId?: string
  orderStatus: string
  orderTotal: number
  orderDate: string
  // orderItems: OrderItems[]
}

export type OrderState = {
  orders: Order[]
  totalPages: number
  order: Order | null
  error: string | null
  isLoading: boolean
}
