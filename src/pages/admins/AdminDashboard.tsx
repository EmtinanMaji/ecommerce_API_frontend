import AdminSidebar from "@/components/ui/AdminSidebar"
import React from "react"

export const AdminDashboard = () => {
  return (
    <div className="layout">
      <div>
        <AdminSidebar />
      </div>
      <div className="main-container">
        <div className="profile-info">{"Hello, everything is here for you. Enjoy :)"}</div>
      </div>
    </div>
  )
}
