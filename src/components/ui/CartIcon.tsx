import React from "react"

import { FaCartPlus } from "react-icons/fa"
const CartIcon = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <FaCartPlus />
      <span className="badge">{value}</span>
    </div>
  )
}
export default CartIcon
