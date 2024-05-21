//api call from here

//category
export type Category = {
    categoryId: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    products: Product[];
}

//products
export type Product = {
    productId: string;
    name: string;
    slug: string;
    imageUrl: string;
    description: string;
    price: number;
    quantity: number;
    sold: number;
    shipping: number;
    categoryId: string;
    createdAt: string;
    category: Category[];
}

export type ProductState = {
  products: Product[]
  totalPages: number
  product : Product | null
  error: null | string
  isLoading: boolean
}

//User
export type User = {
  name: string;
  email: string;
  password: string;
  address: string;
  image?: string;
  isAdmin?: true;
  isBanned?: true;
  createdAt?: string;
}

export type UserState = {
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

export type CustomError = {
  massage: string
}

export type LoginData = {
    isLoggedIn: boolean;
    userData: User | null;
    token: string;
}