import React from 'react'

function ProductCard({ product, onIncrement, onDecrement, onReset }) {
  return (
    <div className={`product-card ${product.count > 0 ? 'selected' : ''}`}>
      <div className="product-image-container">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
          />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>

        <div className="counter-box">
          <button
            className="btn-counter btn-minus"
            onClick={() => onDecrement(product.id)}
            disabled={product.count === 0}
          >
            -
          </button>
          <span className="count-number">{product.count}</span>
          <button
            className="btn-counter btn-plus"
            onClick={() => onIncrement(product.id)}
          >
            +
          </button>
        </div>

        {product.count > 0 ? (
          <div className="item-details">
            <span className="item-subtotal">
              ₹{(product.count * product.price).toLocaleString('en-IN')}
            </span>
            <button
              className="btn-item-reset"
              onClick={() => onReset(product.id)}
            >
              Clear
            </button>
          </div>
        ) : (
          <div className="item-details-empty" />
        )}
      </div>
    </div>
  )
}

export default ProductCard