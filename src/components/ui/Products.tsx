import { fetchProducts } from "@/tookit/slices/productSlice"
import { AppDispatch, RootState } from "@/tookit/store"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SingleProduct from "./SingleProduct"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/tookit/slices/categorySlice"

const Products = () => {
  //access store for all the products
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )
  const { categories } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(4)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinprice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

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
  }, [pageNumber, searchKeyword, sortBy, selectedCategories, minPrice, maxPrice])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize: 20, searchKeyword, sortBy }))
    }
    fetchData()
  }, [])

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNaxtPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    )
  }
  // console.log(selectedCategories)

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinprice(Number(e.target.value))
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value))
  }

  return (
    <div className="container-p">
      <div className="sidebar">
        <div className="filter-section">
          <h3>Filter by Category goes here</h3>
          <div className="categories">
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <div className="category" key={category.categoryId}>
                  <label htmlFor="categories">
                    <input
                      type="checkbox"
                      value={category.categoryId}
                      checked={selectedCategories.includes(category.categoryId)}
                      onChange={() => handleCategoryChange(category.categoryId)}
                    />
                    {/* {" "} */}
                    
                    {category.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="filter-section">
          <h3>Filter by Price goes here</h3>
          <div className="price-filter">
            <label htmlFor="min-price">
              Min Price:
              <input type="text" name="min-price" id="min-price" onChange={handleMinPriceChange} />
            </label>
          </div>
          <div className="price-filter">
            <label htmlFor="max-price">
              Max Price:
              <input type="text" name="max-price" id="max-price" onChange={handleMaxPriceChange} />
            </label>
          </div>
        </div>
      </div>

      <div className="main-content">
        <h2>Products</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Eroor{error}</p>}
        <div className="search-sort">
          <input
            type="text"
            placeholder="Search Products"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <p>Stor By:</p>
          <select name="" id="" onChange={handleSortChange}>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
          </select>
        </div>
        <section className="products">
          {products &&
            products.length > 0 &&
            products.map((product) => <SingleProduct key={product.productId} product={product} />)}
        </section>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={pageNumber == 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={handleNaxtPage} disabled={pageNumber == totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products
