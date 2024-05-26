import { RootState } from "@/tookit/store";
import { PackageIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    const { userData } = useSelector((state: RootState) => state.userR)
    return (
    <div >
        <aside className="sidebar-container" >
            <div>
                <h2>Admin Profile</h2>
                <p>{userData?.name}</p>
                <p>{userData?.email}</p>
            </div>
            <ul>
            <li>
                <Link to="/dashboard/admin/categories"
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                >
                    Categories
                </Link>
            </li>
            <li>
                <Link to="/dashboard/admin/products"
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                >
                <PackageIcon className="h-4 w-4" />
                    Products
                </Link>
            </li>
            <li>
                <Link to="/dashboard/admin/users"
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                >
                <UsersIcon className="h-4 w-4" />
                    Users
                </Link>
            </li>
            <li>
                <Link to="/dashboard/admin/orders"
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                >
                <ShoppingCartIcon className="h-4 w-4" />
                    Orders
                </Link>
            </li>
            </ul>
        </aside>
    </div>
    )
}
export default AdminSidebar