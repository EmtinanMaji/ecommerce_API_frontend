import { logoutUser } from "@/tookit/slices/userSlice";
import { AppDispatch, RootState } from "@/tookit/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const dispatch: AppDispatch = useDispatch()
    const {isLoading} = useSelector((state: RootState) => state.userR)
    const handleLogout = () => {
        dispatch(logoutUser())
    }
    return(
        <nav className="navbar">
            <ul className="navbar_lists">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isLoading && (
                <>
                    <li>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </li>
                </>)}

                {!isLoading && (
                <>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </>)}

                
                
            </ul>
        </nav>
    )
}
export default Navbar