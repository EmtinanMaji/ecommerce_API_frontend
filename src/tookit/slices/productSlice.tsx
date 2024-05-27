
import api from "@/api";
import {CreateProductFormData, Product, ProductState} from "@/types";
import { getToken } from "@/utils/localStorage";
import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductState = {
    products: [],
    totalPages: 1,
    product: null,
    error: null,
    isLoading: false
}

// export const fetchProducts = createAsyncThunk("products/fetchProducts", 
//     async ({pageNumber, pageSize, searchKeyword, sortBy }:{pageNumber: number, pageSize: number, searchKeyword : string, sortBy: string}) => {
//         const response = searchKeyword.length > 0 ? await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}&sortBy=${sortBy}`)
//         : await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
//         return response.data;
 
// })

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts", 
    async ({
        pageNumber, 
        pageSize, 
        searchKeyword, 
        sortBy, 
        selectedCategories,
        minPrice,
        maxPrice
    }:{
        pageNumber: number
        pageSize: number
        searchKeyword: string 
        sortBy: string
        selectedCategories: string[]
        minPrice?: number
        maxPrice?: number
    }) => {
        const params = new URLSearchParams({
            pageNumber: pageNumber.toString(), 
            pageSize: pageSize.toString(), 
            searchKeyword, 
            sortBy
    })
    selectedCategories.forEach((categoryId) => {
        params.append("SelectedCategories", categoryId)
    })
    if (minPrice !== undefined) {
      params.append("MinPrice", minPrice.toString())
    }

    if (maxPrice !== undefined) {
      params.append("MaxPrice", maxPrice.toString())
    }
    const response = await api.get("/products", {params})
    return response.data
 
})

export const fetchProductBySlug  = createAsyncThunk("products/fetchProductsBySlug", async (slug: string | undefined) => {
    
    const response = await api.get(`/products/${slug}`)
    //console.log(response.data);
    return response.data;
})

export const deleteProduct = createAsyncThunk("products/deleteProduct", 
    async (productId: string) => {
        await api.delete(`/products/${productId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
        return productId
})

export const createProduct = createAsyncThunk("products/createProduct", async (newProduct: CreateProductFormData) => {
    const response = await api.post(`/products`, newProduct, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
})
    return response.data;
})

export const updateProduct = createAsyncThunk("products/updateProduct", 
async ({updateProductData, productId}: {updateProductData: CreateProductFormData, productId: string}) => {
    const token = getToken();
    const response = await api.put(`/products/${productId}`, updateProductData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
})

//cases: pending, fullfilled, rejected
const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {}, 
    extraReducers(builder) {
        /*
        builder.addCase(fetchProducts.pending, (state) => {
            state.error = null
            state.isLoading = true
        })*/
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload.data.items
            state.totalPages = action.payload.data.totalPages
            state.isLoading = false
        })/*
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.error = action.error.message || "An error occured"
            state.isLoading = false
        })

        builder.addCase(fetchProductsBySlug.pending, (state) => {
            state.error = null
            state.isLoading = true
        })*/
        builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
            state.product = action.payload.data
            state.isLoading = false
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(product => product.productId != action.payload)
            state.isLoading = false
        })

        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
            state.isLoading = false
        })

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const foundProduct = state.products.find((product) => product.productId == action.payload.data.productId)
            if(foundProduct){
                foundProduct.name = action.payload.data.name
        foundProduct.imageUrl = action.payload.data.imageUrl
        foundProduct.description = action.payload.data.description
        foundProduct.price = action.payload.data.price
        foundProduct.quantity = action.payload.data.quantity
        foundProduct.sold = action.payload.data.sold
        foundProduct.shipping = action.payload.data.shipping
        foundProduct.categoryId = action.payload.data.categoryId
      }
            state.isLoading = false
        })
    // builder.addCase(updateProduct.fulfilled, (state, action) => {
    //     const updatedProductIndex = state.products.findIndex(
    //       (product) => product.productId === action.payload.productId
    //     )
    //     if (updatedProductIndex >= 0) {
    //       state.products[updatedProductIndex] = action.payload
    //     }
    //   })  
        
        /*
        builder.addCase(fetchProductsBySlug.rejected, (state, action) => {
            state.error = action.error.message || "An error occured"
            state.isLoading = false
        })*/
        builder.addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.error = null
                state.isLoading = true
            }
        )

        builder.addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action) => {
                state.error = "An error occured"
                state.isLoading = false
            }
        )


    }
})

export default productSlice.reducer