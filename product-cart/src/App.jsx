import { useState } from 'react'
import ProductCard from './ProductCard'
import './App.css'

const initialProducts = [
  {
    id: 1,
    name: 'Lenovo Legion 5 Pro',
    price: 54999,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9nBB16rHBLSLIxDDWS6VStB_VggYAs2zcc8vEPRNaHA&s=10',
    count: 0,
  },
  {
    id: 2,
    name: 'Samsung S26 Ultra',
    price: 75000,
    image: 'https://m.media-amazon.com/images/I/71ju4kS-W8L._AC_UF1000,1000_QL80_.jpg',
    count: 0,
  },
  {
    id: 3,
    name: 'Logitech G733 Wireless Headset',
    price: 8000,
    image: 'https://www.simplygaming.in/cdn/shop/files/Logitech_G733_LIGHTSPEED_RGB_Gaming_Headset_in_Black_with_wireless_connectivity_and_RGB_lighting..png?v=1734340012',
    count: 0,
  },
  {
    id: 4,
    name: 'Apple Watch Series 11',
    price: 46900,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s11-case-unselect-gallery-1-202509_GEO_EMEA_FMT_WHH?wid=752&hei=720&fmt=p-jpg&qlt=80&.v=WldDSmZlQ1ladGVha0lMWUJJK2M4ZHlVRllKam5abHNZRGludXlMbytKNFo2cm95TEtVUGNBN3pWWWMxUmxKSFh2WnVKTjEySjVmY2ZteE1GdEFoNWM2c3NSYUM4YjA0RTQxLytvRzE4M0QrWGp4amFCSTJ1K1hKMXRsMkNUYlhaOWRBWGt2OWI4clNTdjYwdnkxK0RR',
    count: 0,
  },
  {
    id: 5,
    name: 'Logitech Mechanical Keyboard',
    price: 10000,
    image: 'https://m.media-amazon.com/images/I/61tDcFtU5NL.jpg',
    count: 0,
  },
  {
    id: 6,
    name: 'Razer DeathAdder Essential',
    price: 1500,
    image: 'https://m.media-amazon.com/images/I/61t9BQyeJkS.jpg',
    count: 0,
  },
  {
    id: 7,
    name: 'JBL Charge 6',
    price: 23000,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQiDKFgO8A1Be_pp6VpBg2PaWpX4UPCPR60mz-6p5Jr-l04C_DZUuSn8dIXdLBV8S-F1pM82o5UYAd1qcYnjzwhnHZQXeSK_aXJSdBzieOZP9sgEMU-_52u_A',
    count: 0,
  },
]

function App() {
  const [products, setProducts] = useState(initialProducts)

  const handleIncrement = (id) => {
    setProducts(
      products.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    )
  }

  const handleDecrement = (id) => {
    setProducts(
      products.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    )
  }

  const handleResetItem = (id) => {
    setProducts(
      products.map((item) =>
        item.id === id ? { ...item, count: 0 } : item
      )
    )
  }

  const handleResetAll = () => {
    setProducts(products.map((item) => ({ ...item, count: 0 })))
  }

  const totalItems = products.reduce((sum, item) => sum + item.count, 0)
  const totalPrice = products.reduce((sum, item) => sum + item.count * item.price, 0)
  const cartItems = products.filter((item) => item.count > 0)

  const handleCheckout = () => {
    alert(`Order Placed Successfully\n\nTotal Items: ${totalItems}\nTotal Amount: ₹${totalPrice.toLocaleString('en-IN')}\n\nThank you for choosing E-Gadgets.`)
    handleResetAll()
  }

  return (
    <div className="container">
      <header className="header">
        <h1>E-Gadgets</h1>
        <p className="subtitle">Curated Electronics & Accessories</p>
      </header>

      <section className="dashboard-bar">
        <div className="stat-card">
          <span className="stat-label">Items Selected</span>
          <span className="stat-value">{totalItems}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Price</span>
          <span className="stat-value price-highlight">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
        <button
          className="btn-reset-all"
          onClick={handleResetAll}
          disabled={totalItems === 0}
        >
          Reset All
        </button>
      </section>

      <main className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleResetItem}
          />
        ))}
      </main>

      <section className="cart-section">
        <div className="cart-header-row">
          <h2>Your Cart</h2>
          <span className="cart-badge">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart-msg">Your cart is currently empty.</p>
        ) : (
          <div className="cart-content">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="cart-item-col">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-thumb"
                        />
                      )}
                      <span className="cart-item-name">{item.name}</span>
                    </td>
                    <td>₹{item.price.toLocaleString('en-IN')}</td>
                    <td>
                      <div className="table-qty-control">
                        <button
                          className="btn-mini"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <span className="qty-badge">{item.count}</span>
                        <button
                          className="btn-mini"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{(item.count * item.price).toLocaleString('en-IN')}</td>
                    <td>
                      <button
                        className="btn-remove"
                        onClick={() => handleResetItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-total-box">
              <div className="total-summary">
                <span className="total-label">Total Amount</span>
                <span className="grand-total">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <button className="btn-checkout" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
