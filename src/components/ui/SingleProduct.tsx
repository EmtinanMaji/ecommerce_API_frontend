import { addToCart } from "@/tookit/slices/cartSlice";
import { AppDispatch } from "@/tookit/store";
import { Product } from "@/types";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SingleProduct = (props: { product: Product }) => {
    const { product } = props
    const dispatch: AppDispatch = useDispatch();
    

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product))
    }

    return(
        <article className="product card">
            <img src={product.imageUrl} alt={product.name} className="product_img" />
            <div className="product_bady">
                <h3 className="product_name">{product.name}</h3>
                <p className="product_description">{product.description.substring(0, 100)}...</p>
                <p className="product_price">Price: {product.price.toLocaleString("en-us", {
                    style: "currency",
                    currency: "USD"
                })}</p>
                <div>
                    
                    <Link to={`/products/${product.productId}`}>
                        <button className= "btn product_btn">
                        Show Details 
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </Link>
                    <button className= "btn product_btn" onClick={() => {
                        handleAddToCart(product)
                    }}>
                        Add To Cart
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default SingleProduct