import { useContext } from "react"
import { CartContext } from "./CartContext"

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext)

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 && (
        <p className="text-gray-500">Your cart is empty.</p>
      )}

      {cart.map(item => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQty(item.id)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => increaseQty(item.id)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-bold">
            Total: ${totalPrice.toFixed(2)}
          </h3>

          <button
            onClick={clearCart}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Clear Cart
          </button>

          <button
            className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}