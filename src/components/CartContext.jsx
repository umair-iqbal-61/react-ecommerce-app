import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { CartContext } from "./CartContext"

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })

    if (cart.find(item => item.id === product.id)) {
      toast("Product already in cart!", {
        icon: "⚠️",
        style: {
          background: "#facc15",
          color: "#000",
        },
      })

      return
    }


    toast.success("Product added to cart 🛒")
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
