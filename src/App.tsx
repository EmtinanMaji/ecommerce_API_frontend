//import { useQuery } from "@tanstack/react-query"
/*
import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./components/ui/card"
import { Product } from "./types"
*/
import api from "./api"

import "./App.css"
import { useEffect } from "react"
import Index from "./routes"

function App() {
  /*
  const getProducts = async () => {
    try {
      console.log("runn")
      const res = await api.get("/products")
      console.log(res.data.data.items)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  useEffect(() => {
    getProducts()

  },[]);*/
/*
  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
*/
  return (
    <div className="App">
      <Index />
    </div>
  )
}

export default App
