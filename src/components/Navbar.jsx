import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const { cart } = useContext(CartContext)
  // const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const subtotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  const tax = subtotal * 0.05
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isCartOpen])


  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        Products Store
      </Link>

      <button className="cursor-pointer font-bold" onClick={() => setIsCartOpen(true)}>
        Cart
      </button>

      {isCartOpen && (
        <div className="fixed inset-0 z-40"
          onClick={() => setIsCartOpen(false)}>
        </div>
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-[#292929] shadow-lg z-50 flex flex-col transform transition-transform duration-300 
      ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>


        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button className="cursor-pointer" onClick={() => setIsCartOpen(false)}>✖</button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="mb-4 border-b pb-2">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p>${item.price} x {item.quantity}</p>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>

          <div className="flex justify-between font-semibold text-base border-t pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => toast.success("Order placed successfully 🎉")}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </nav>
  )
}