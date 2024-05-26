import AdminSidebar from "@/components/ui/AdminSidebar";
import useCategoriesState from "@/hooks/useCategoriesState";
import useProductsState from "@/hooks/useProductsState";
import { fetchCategories } from "@/tookit/slices/categorySlice";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "@/tookit/slices/productSlice";
import { AppDispatch } from "@/tookit/store";
import {CreateProductFormData, Product } from "@/types";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const AdminProducts = () => {
    const { categories} = useCategoriesState()
    const {products, isLoading, error, totalPages } = useProductsState()

    const dispatch: AppDispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        //watch,
        formState: { errors }
    } = useForm<CreateProductFormData>()


      const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [isEdit, setIsEdit] = useState(false)

  const [selectedProductId, setSelectedProductId] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinprice] = useState<number | undefined>(undefined)
const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
    

//    const watchedCategoryIds = watch("categoryId")
//    useEffect(() => {
//         console.log("Selected categories: ", watchedCategoryIds)
//     },[watchedCategoryIds]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({
          pageNumber,
          pageSize,
          searchKeyword,
          sortBy,
          selectedCategories,
          minPrice,
          maxPrice
        })
      )
    }
    fetchData()
  }, [pageNumber, searchKeyword, sortBy, dispatch])

 useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize, searchKeyword, sortBy }))
    }
    fetchData()
  }, [dispatch])
    
    const handlePreviousPage = () => {
        setPageNumber(currentPage => currentPage - 1)
    }

    const handleNaxtPage = () => {
        setPageNumber(currentPage => currentPage + 1)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value)
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value)
    }
    const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
        try {
            // let imageUrls =""
            // if (data.imageUrl && data.imageUrl.length > 0) {
            //     const file = data.imageUrl[0]
            //     //upload the file to the cloudinary
            //     imageUrls = await uploadImageToCloudinary(file)
            // }

            // const productData = {
            //     ... data,
            //     image: imageUrls,
            //     //categoryId: watchedCategoryIds
            // }

    // await dispatch(createProduct(productData))
    //   reset() 
    //   setImagePreview(null)
      if (isEdit) {
        await dispatch(updateProduct({ updateProductData: data, productId: selectedProductId }))
        setIsEdit(false)
      } else {
        await dispatch(createProduct(data))
      }
      reset()
    } catch (error) {
      console.log(error)
    
    }
}


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    }
    
        const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteProduct(id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (product: Product) => {
        setIsEdit(true)
        setSelectedProductId(product.productId)
    setValue("name", product.name)
    setValue("imageUrl", product.imageUrl)
    setValue("description", product.description)
    setValue("price", product.price)
    setValue("quantity", product.quantity)
    setValue("shipping", product.shipping)
    setValue("categoryId", product.categoryId)


        //setValue("categoryId", product.categorirs.map(category => category.categoryId))
       // setImagePreview(product.imageUrl)
    }

    
    return(
            <div className="container">
            <AdminSidebar />
            <div className="main-container">
            {isLoading && <p>Loading...</p>}
            {error && <p>Eroor{error}</p>}
            <div>
                <input type="text" placeholder="Search Product" value={searchKeyword} onChange={handleSearchChange} />
                <p>Stor By:</p>
                <select name="" id="" onChange={handleSortChange}>
                    <option value="Name">Name</option>
                    <option value="Price">Price</option>
                </select>
            </div>
{/* create or edite Product */}
            <div>
                <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>
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
                    <label htmlFor="description"> Description: </label>
                    <textarea {... register("description")}></textarea>
                    </div>

                    <div className="form-field">
                    <label htmlFor="price"> Price: </label>
                    <input type="number" step="0.01" {... register("price",{
                        required: "Price is required"
                    })}/>
                    {errors.price && <p> {errors.price.message} </p>}
                    </div>

                    <div className="form-field">
                    <label htmlFor="quantity"> Quantity: </label>
                    <input type="number" step="0.01" {... register("quantity",{
                        required: "Quantity is required"
                    })}/>
                    {errors.quantity && <p> {errors.quantity.message} </p>}
                    </div>

                    <div className="form-field">
                    <label htmlFor="shipping"> Shipping: </label>
                    <input type="number" step="0.01" {... register("shipping",{
                        required: "Shipping is required"
                    })}/>
                    {errors.shipping && <p> {errors.shipping.message} </p>}
                    </div>

                    <div className="form-field"> 
                    <label htmlFor="image"> Image: </label>
                    <input type="file" accept="image/*" {... register("imageUrl")} onChange={handleImageChange}/>
                    {/* {imagePreview && <img src={imagePreview} alt="image preview"
                    className="table-img" />} */}
                    </div>
                    <br />
                    
                    <div className="form-field">
              <label htmlFor="categoryIds"> Category: </label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
                    <br />
                    

                    <button className="btn" type="submit">
                    {isEdit ? "Update Product" : "Create Product"}
                    </button>
                    </form>
            </div>
            <h2>List of Product: </h2>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>categories</th>
                        <th>Description</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products &&
                        products.length > 0 &&
                        products.map((product) => (
                            <tr key={product.productId}>
                                <td><img src={product.imageUrl} alt={product.slug}/></td>
                                <td>{product.name}</td>
                                <td>{JSON.stringify(product.category?.name)}</td>
                                <td>{product.description.substring(0,100)}...</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className= "btn" 
                                    onClick={() => {handleEdit(product)}}>
                                    Edit
                                    </button>
                                    <button className= "btn" 
                                    onClick={() => {handleDelete(product.productId)}}>
                                    Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>        

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={pageNumber == 1} >Previous</button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => setPageNumber(index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button onClick={handleNaxtPage} disabled={pageNumber == totalPages} >Next</button>
            </div>
    
            </div>
        </div>
        
            
    )
    
}