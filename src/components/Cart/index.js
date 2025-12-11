import {useContext} from 'react'
import Header from '../Header'
import EachCartItem from '../EachCartItem'
import CartContext from '../../CartContext'

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
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty-cart-img"
          />
        </div>
      ) : (
        <div>
          <button type="button" onClick={removeAll}>
            Remove All
          </button>
          <ul>
            {cartList.map(eachItem => (
              <EachCartItem itemDetails={eachItem} key={eachItem.dishId} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Cart
