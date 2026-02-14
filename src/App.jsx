import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProductCard from "./components/ProductCard"
import CartPage from "./components/CartPage"

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductCard />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App
