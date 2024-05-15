import { fetchProducts } from "@/tookit/slices/productSlice";
import { AppDispatch, RootState } from "@/tookit/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";

const Products = () => {
    //access store for all the products
    const { products, isLoading, error } = useSelector((state: RootState) => state.productR)

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
    //getProducts()
        const fetchData = async () => {
            await dispatch(fetchProducts())
        }
        fetchData()
    },[]);

    return(
        <div>
            <h2>Products</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Eroor{error}</p>}
            <section className="products">
                {products && products.length > 0 &&
                products.map((product) => 
                <SingleProduct key={product.productId}
                product={product}/>)}
            </section>
        </div>
    );
}

export default Products