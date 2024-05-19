import PageTitle from "@/components/ui/PageTitle";
import { fetchProductsBySlug } from "@/tookit/slices/productSlice";
import { AppDispatch, RootState } from "@/tookit/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ProductDetails = () =>{
    const {slug} = useParams <{ slug: string }>()
    const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

    const dispatch: AppDispatch = useDispatch()
    console.log(product)
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchProductsBySlug(slug))
        }
        fetchData()
    },[]);

    return(
        <div>
            <PageTitle title="Product Details"/>
            <article className="products-details">
                <h2>Products</h2>
                {isLoading && <p>Loading...</p>}
                {error && <p>Eroor{error}</p>}
                <section className="products">
                    {product && <div>
                        <img src={product.imageUrl} alt={product.name} className="product-details__img"/>
                        <div className="product-details__bady">
                            <h3 className="product-details__name">{product.name}</h3>
                            <p className="product-details__description">{product.description}</p>
                            <p className="product-details__quantity">{product.quantity}</p>
                            <p className="product-details__sold">{product.sold}</p>
                            <p className="product-details__price">{product.price}</p>
                            <p>Product Added: {new Date(product.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>}
                </section>
            </article>
        
        </div>
    )
}