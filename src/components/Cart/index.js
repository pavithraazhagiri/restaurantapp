import {useContext} from 'react'
import Header from '../Header'
import EachCartItem from '../EachCartItem'
import CartContext from '../../CartContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)
  const removeAll = () => {
    removeAllCartItems()
  }
  console.log(cartList)
  return (
    <>
      <Header />
      {cartList.length === 0 ? (
        <div className="empty-cart-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty-cart-img"
            className="empty-cart-image"
          />
        </div>
      ) : (
        <div>
          <div className="remove-all-button-container">
            <button
              type="button"
              onClick={removeAll}
              className="remove-all-button"
            >
              Remove All
            </button>
          </div>
          <div className="cart-ul-list-container">
            <ul className="cart-ul-list">
              {cartList.map(eachItem => (
                <EachCartItem itemDetails={eachItem} key={eachItem.dishId} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
