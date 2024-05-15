import PageTitle from "@/components/ui/PageTitle";
import Products from "@/components/ui/Products";
import ProductSidebar from "@/components/ui/layout/sidebars/ProductSidebar";
import React from "react";

export const Home = () =>{
    return(
        <div>
            <PageTitle title="Home"/>
            <div className="sidebar-container">
                <ProductSidebar />
            </div>
            <div className="main-container">
                <Products />
            </div>
        </div>
    )
}