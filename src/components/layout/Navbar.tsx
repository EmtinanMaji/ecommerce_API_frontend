import { logoutUser } from "@/tookit/slices/userSlice"
import { AppDispatch, RootState } from "@/tookit/store"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CartIcon from "../ui/CartIcon"
import useCartState from "@/hooks/useCartState"
import { MountainIcon } from "lucide-react"
import { FaCircleUser } from "react-icons/fa6"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

export const Navbar = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
  const { cartItems } = useCartState()
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <nav className="navbar">
      <ul className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        <li>
          <Link className="flex items-center gap-2" to="/">
            {/* Logo <MountainIcon className="h-6 w-6" /> */}
            <span className="text-lg font-bold">Home</span>
          </Link>
        </li>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                {/* <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover"
                  }}
                  width="32"
                /> */}
                <FaCircleUser />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            {isLoggedIn && (
              // <>
              //   <li>
              //     <Link to="/" onClick={handleLogout}>
              //       Logout
              //     </Link>
              //   </li>
              // </>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/dashboard/user">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}

            {!isLoggedIn && (
              //   <>
              //     <li>
              //       <Link to="/register">Register</Link>
              //     </li>
              //     <li>
              //       <Link to="/login">Login</Link>
              //     </li>
              //   </>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/register">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
          {/* <Link className="relative" href="#">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full px-2 py-0.5 text-xs font-medium">
              3
            </span>
            <span className="sr-only">Cart</span>
          </Link> */}
          <li>
            <Link to="/cart">
              {" "}
              <CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0} />{" "}
              
            </Link>
          </li>
        </div>

        {/* {isLoggedIn && (
          <>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )} */}
      </ul>
    </nav>
  )
}
export default Navbar
