import { useEffect, useState } from "react"
import { useContext } from "react"
import { CartContext } from "./CartContext"

function ProductCard() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const { cart, addToCart } = useContext(CartContext)

  const filterProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  if (loading) return <h2>loading...</h2>
  if (error) return <h2>{error}</h2>


  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            filterProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
                <img className="h-40 mx-auto object-contain mb-3" src={product.image} alt={product.title} />

                <h2 className="text-sm font-semibold line-clamp-2 mb-2">{product.title}</h2>
                <p className="text-lg font-bold text-green-600">${product.price}</p>
                <button className="mt-3 w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 transition" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default ProductCard