import PageTitle from "@/components/ui/PageTitle";
import { registerUser } from "@/tookit/slices/userSlice";
import { AppDispatch } from "@/tookit/store";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
    name: string
    email: string
    password: string
    image: string
    phone: string
    address: string
}
export const Register = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch()
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>()

    //const [imagePreview, setImagePreview] = useState<string | null>(null)

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            /*let imageUrl =""
            if (data.image && data.image.length > 0) {
                const file = data.image[0]
                //upload the file to the cloudinary
                imageUrl = await uploadImageToCloudinary(file)
            }

            const userData = {
                ... data,
                image: imageUrl
            }
*/
            const response = await dispatch(registerUser(data))
            console.log("Response from Register: "+ response)
            toast.success(response.payload.message)
            navigate("/login")
        } catch (error: any) {
            toast.error(error.message || "Registration failed")
        }
    }
/*
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    }
  */  
    return(
        <div>
            <PageTitle title="Register"/>
            <h2>User Registeration</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-field">
                    <label htmlFor="name"> Name: </label>
                    <input type="text" {... register("name",{
                        required: "Name is required",
                        minLength: {value: 2, message: "Name must be at least 2 characters"}
                    })}/>
                    {errors.name && <p> {errors.name.message} </p>}
                </div>

                <div className="form-field">
                    <label htmlFor="email"> Email: </label>
                    <input type="email" {... register("email",{
                        required: "Email is required",
                        pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email is not valid"}
                    })}/>
                    {errors.email && <p> {errors.email.message} </p>}
                </div>

                <div className="form-field">
                    <label htmlFor="address"> Address: </label>
                    <textarea {... register("address")}></textarea>
                </div>

                <div className="form-field">
                    <label htmlFor="image"> Image: </label>
                    <input type="file" accept="image/*" {... register("image")}/>
                    
                </div>

                <div className="form-field">
                    <label htmlFor="password"> Password: </label>
                    <input type="password" {... register("password",{
                        required: "Password is required",
                        minLength: {value: 6, message: "Password must be at least 6 characters"}
                    })}/>
                    {errors.password && <p> {errors.password.message} </p>}
                </div>

                <button className="btn" type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}