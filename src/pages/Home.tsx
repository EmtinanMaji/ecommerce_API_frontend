import PageTitle from "@/components/ui/PageTitle"
import Products from "@/components/ui/Products"
import ProductSidebar from "@/components/layout/sidebars/ProductSidebar"
import React from "react"

export const Home = () => {
  return (
    <div>
      <PageTitle title="Home" />
      <section className="hero-section" id="hero">
        <div >
          <h1 className="welcome-text">Welcome to Bloom & Grow</h1>
          <p className="hero-text">--Your Destination for Greenery--</p>
          {/* <button>Shop now</button> */}
        </div>
      </section>

      {/* <div className="sidebar-container">
        <ProductSidebar />
      </div> */}
      <div className="main-container">
        <Products />
      </div>
    </div>
  )
}
