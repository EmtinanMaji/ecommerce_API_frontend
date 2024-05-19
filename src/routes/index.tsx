import { Home } from "@/pages/Home";
import { Error } from "@/pages/Error";
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "@/components/ui/layout/Navbar";
import Footer from "@/components/ui/layout/Footer";
import { ProductDetails } from "@/pages/ProductDetails";

const Index = () => {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:slug" element={<ProductDetails />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Index