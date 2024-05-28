import UserSidebar from "@/components/ui/UserSidebar"
import React from "react"

export const UserOrders = () => {
  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="main-content">
        <div className="profile-info">You did not have any order to display</div>
      </div>
    </div>
  )
}
