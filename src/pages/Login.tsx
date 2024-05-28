import PageTitle from "@/components/ui/PageTitle"
import { loginUser, registerUser } from "@/tookit/slices/userSlice"
import { AppDispatch } from "@/tookit/store"
import { LoginFormData } from "@/types"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const Login = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data))
      //console.log("success" + response)
      const isAdmin = response.payload.data.loggedInUser.isAdmin
      console.log(isAdmin)
      toast.success(response.payload.message)
      navigate(isAdmin ? "/dashboard/admin" : "/dashboard/user")
    } catch (error: any) {
      toast.error(error.message || "Login failed")
    }
  }

  return (
    <div className="screen">
      <div className="container">
        <PageTitle title="Login" />

        <h2 className="text">Welcome back!</h2>
        {/* <h2>User Login</h2> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-field">
            <label htmlFor="email" className="label">
              {" "}
              Email:{" "}
            </label>
            <input
              className="input"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email is not valid" }
              })}
            />
            {errors.email && <p> {errors.email.message} </p>}

            <label htmlFor="password" className="label">
              {" "}
              Password:{" "}
            </label>
            <input
              className="input"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && <p> {errors.password.message} </p>}
          </div>

          <button className="button" type="submit">
            Login
          </button>
        </form>
        <div className="register_m">
          Do not have an account?
          <Link to="/register" className="register_link">
            Register
          </Link>
          <div className="register_m">
            Log in later, go to
            <Link to="/" className="register_link">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
