import {useContext} from 'react'
import CartContext from '../../CartContext'
import './index.css'

const EachCartItem = props => {
  const {itemDetails} = props
  const {dishId, dishName, dishPrice, dishImage, quantity} = itemDetails
  // prettier-ignore
  const {incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)
  const add = () => {
    // const itemDetailsToAdd = {dishId, dishName, dishPrice, dishImage}
    incrementCartItemQuantity(dishId)
  }
  const reduce = () => {
    // const itemDetailsToReduce = {dishId, dishName, dishPrice, dishImage}
    decrementCartItemQuantity(dishId)
  }
  return (
    <li className="cart-item-container">
      <div className="cart-item-dish-name-container">
        <h1 className="cart-item-dish-name">{dishName}</h1>
      </div>
      <img src={dishImage} alt={dishName} className="cart-item-dish-image" />
      <div>
        <div className="cart-item-quantity-buttons-container">
          <button
            type="button"
            className="quantity-button-minus"
            onClick={reduce}
          >
            -
          </button>
          <p className="quantity">{quantity}</p>
          <button type="button" className="quantity-button-plus" onClick={add}>
            +
          </button>
        </div>
        <p className="cart-item-dish-price">SAR {dishPrice * quantity}</p>
      </div>
    </li>
  )
}
export default EachCartItem
