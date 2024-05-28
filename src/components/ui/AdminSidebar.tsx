import { RootState } from "@/tookit/store"
import { GalleryThumbnails, PackageIcon, ShoppingCartIcon, UsersIcon } from "lucide-react"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <div className="admin-profile-container">
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <h2>Admin Profile</h2>
          <p>{userData?.name}</p>
          <p>{userData?.email}</p>
        </div>
        <ul className="admin-menu">
          <li className="admin-menu-item">
            <Link to="/dashboard/admin/categories" className="admin-menu-link">
              <GalleryThumbnails className="admin-menu-icon" />
              Categories
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/dashboard/admin/products" className="admin-menu-link">
              <PackageIcon className="admin-menu-icon" />
              Products
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/dashboard/admin/users" className="admin-menu-link">
              <UsersIcon className="admin-menu-icon" />
              Users
            </Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/dashboard/admin/orders" className="admin-menu-link">
              <ShoppingCartIcon className="admin-menu-icon" />
              Orders
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}
export default AdminSidebar
