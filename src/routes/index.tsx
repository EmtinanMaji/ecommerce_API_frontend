import { Home } from "@/pages/Home"
import { Error } from "@/pages/Error"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ProductDetails } from "@/pages/ProductDetails"
import { Register } from "@/pages/Register"
import { Login } from "@/pages/Login"
import { UserDashboard } from "@/pages/users/UserDashboard"
import { AdminDashboard } from "@/pages/admins/AdminDashboard"
import { UserProfile } from "@/pages/users/UserProfile"
import { UserOrders } from "@/pages/users/UserOrders"
import { AdminOrders } from "@/components/ui/AdminOrders"
import { AdminUsersManagement } from "@/components/ui/AdminUsersManagement"
import { AdminProducts } from "@/components/ui/AdminProducts"
import { AdminCategories } from "@/components/ui/AdminCategories"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"
import { Cart } from "@/pages"

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/user/profile" element={<UserProfile />} />
          <Route path="/dashboard/user/orders" element={<UserOrders />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/categories" element={<AdminCategories />} />
          <Route path="/dashboard/admin/products" element={<AdminProducts />} />
          <Route path="/dashboard/admin/users" element={<AdminUsersManagement />} />
          <Route path="/dashboard/admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
