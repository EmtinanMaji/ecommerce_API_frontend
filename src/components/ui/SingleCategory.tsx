import { deleteCategory } from "@/tookit/slices/categorySlice"
import { AppDispatch } from "@/tookit/store"
import { Category } from "@/types"
import React from "react"
import { useDispatch } from "react-redux"

const SingleCategory = (props: { category: Category }) => {
  const { category } = props

  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: string) => {
    dispatch(deleteCategory(id))
    try {
      const response = await dispatch(deleteCategory(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: string) => {
    dispatch(deleteCategory(id))
    try {
      const response = await dispatch(deleteCategory(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article className="category card">
      <div className="category_bady">
        <h3 className="category_name">{category.name}</h3>
        <p className="category_description">{category.description.substring(0, 100)}...</p>
        <div>
          <button
            className="btn"
            onClick={() => {
              handleEdit(category.categoryId)
            }}
          >
            Edit
            <i className="fa fa-eye" aria-hidden="true"></i>
          </button>

          <button
            className="btn"
            onClick={() => {
              handleDelete(category.categoryId)
            }}
          >
            Delete
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  )
}

export default SingleCategory
