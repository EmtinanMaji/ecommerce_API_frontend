import UserSidebar from "@/components/ui/UserSidebar"
import React from "react"

export const UserDashboard = () => {
  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="main-content">
        <div className="profile-info">{"Hello, everything is here for you. Enjoy :)"}</div>
      </div>
    </div>
  )
}
