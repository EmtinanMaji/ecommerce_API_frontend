import PageTitle from "@/components/ui/PageTitle"
import useCartState from "@/hooks/useCartState"
import useUsersState from "@/hooks/useUsersState"
import {
  decrementQuantity,
  incrementQuantity,
  removeAllFromCart,
  removeFromCart
} from "@/tookit/slices/cartSlice"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Cart = () => {
  const { cartItems } = useCartState()

  const { userData, isLoggedIn } = useUsersState()

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveAllProductsFromCart = () => {
    dispatch(removeAllFromCart())
  }

  const handelRemoveFromCart = (productId: string) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    }
  }

  const handelIncrementQuantity = (productId?: string) => {
    if (productId) {
      dispatch(incrementQuantity(productId))
    }
  }
  const handelDecrementQuantity = (productId?: string) => {
    if (productId) {
      dispatch(decrementQuantity(productId))
    }
  }

  const cartTotal = () => {
    let total = 0
    cartItems && cartItems.map((cartItem) => (total += cartItem.price * cartItem.orderQuantity))
    return total
  }

  // const handlePlaceOrder = async () => {
  //   if (!isLoggedIn || !userData || !userData.userId) {
  //     alert("Please log in to place an order.")
  //     return
  //   }

  //   const newOrder = {
  //     userId: userData.userId,
  //     userName: userData.name,
  //     products: cartItems.map((item) => ({
  //       productId: item.productId,
  //       productQuantity: item.orderQuantity
  //     })),
  //     totalPrice: parseFloat(calculateTotal())
  //   }

  //   try {

  //     const response = await api.post("/orders", newOrder, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`
  //       }
  //     })
  //     console.log("Order response:", response.data)

  //     setTimeout(async () => {
  //       try {
  //         const ordersResponse = await dispatch(addOrders(userData.userId)).unwrap()
  //         console.log("Fetched orders after placing order:", ordersResponse)
  //       } catch (fetchError) {
  //         console.error("Failed to fetch orders:", fetchError)
  //       }
  //     }, 1000)
  // setIsModalOpen(true)
  //     dispatch(removeAllFromCart())
  //     navigate("/dashboard/user/orders")
  //   } catch (error) {
  //     console.error("Failed to place order:", error)
  //     alert("Failed to place order.")
  //   }
  // }

  return (
    <div className="cart">
      <PageTitle title={"Cart"} />
      {/* {isModalOpen && (
        <OrderConfirmationModal
          onClose={() => setIsModalOpen(false)}

        />
      )} */}
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart_heading card">
            <h2>Shopping Cart [{cartItems.length}]</h2>
            <button className="btn" onClick={handleRemoveAllProductsFromCart}>
              Remove all items
              <i className="fas fa-trash-alt"></i>
            </button>
            <button
              className="btn"
              onClick={() => {
                navigate("/")
              }}
            >
              Continue shopping
            </button>
          </div>
          <div className="cart_body card">
            <div className="cart_items">
              {cartItems.map((cartItem) => (
                <div className="cart_item card" key={cartItem.productId}>
                  <div className="cart_item_left">
                    <img className="cart_img" src={cartItem.imageUrl} alt={cartItem.name} />
                  </div>
                  <div className="cart_item_center">
                    <p>{cartItem.name}</p>
                    <p>Price: {cartItem.price}</p>
                    <p>In stock: {cartItem.quantity}</p>
                  </div>
                  <div className="cart_item_right">
                    <div className="quantity_controls">
                      <button
                        onClick={() => {
                          handelIncrementQuantity(cartItem.productId)
                        }}
                        disabled={cartItem.quantity == cartItem.orderQuantity}
                      >
                        +
                      </button>
                      <span>{cartItem.orderQuantity}</span>
                      <button
                        onClick={() => {
                          handelDecrementQuantity(cartItem.productId)
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="cart_item_price">${cartItem.price.toFixed(2)}</div>
                  <div className="cart_item_btn">
                    <button
                      onClick={() => {
                        handelRemoveFromCart(cartItem.productId)
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart_summary">
              <h3>Cart Summary</h3>
              <h4>Total: {cartTotal()} $</h4>
              {isLoggedIn ? (
                <div>
                  <p>{userData && userData.address}</p>
                  <button
                    onClick={() => {
                      navigate("/dashboard/user/profile")
                    }}
                  >
                    Update Delivery Address
                  </button>
                  <br />
                  <button>Pay here</button>
                </div>
              ) : (
                <h3>login first for placing the order and the delivery address</h3>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  )
}
