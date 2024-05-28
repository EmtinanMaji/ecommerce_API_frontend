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
            <img
              src="https://res.cloudinary.com/emtinan-cloud/image/upload/v1716933439/e-commerce-sda2/aqm5umgshhg0hudqrtw4.png"
              className="logo"
              alt="Logo"
            ></img>
            {/* Logo <MountainIcon className="h-6 w-6" /> */}
            <span className="text-lg font-bold">Bloom & Grow</span>
          </Link>
        </li>

        <div className="drop-menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
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

          <li className="cart-link">
            <Link to="/cart">
              {" "}
              <CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0} />{" "}
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}
export default Navbar
