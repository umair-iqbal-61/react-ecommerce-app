import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { cart } = useContext(CartContext)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        Products Store
      </Link>

      <Link to="/cart" >
        Items in Cart: {totalItems}
      </Link>
    </nav>
  )
}