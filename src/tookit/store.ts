import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
//import cartReducer from "./slices/CartSlice";
//import orderReducer from "./slices/OrdersSlice"


export const store = configureStore({
    reducer:{
        productR: productReducer,
        userR: userReducer,
        categoryR: categoryReducer,
        //cartR: cartReducer,
        //orderR: orderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


