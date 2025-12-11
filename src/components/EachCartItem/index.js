import {useContext} from 'react'
import CartContext from '../../CartContext'

const EachCartItem = props => {
  const {itemDetails} = props
  const {dishId, dishName, dishImage, dishPrice, quantity} = itemDetails
  // prettier-ignore
  const {incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)
  const add = () => {
    const itemDetailsToAdd = {dishId, dishName, dishPrice, dishImage}
    incrementCartItemQuantity(itemDetailsToAdd)
  }
  const reduce = () => {
    const itemDetailsToReduce = {dishId, dishName, dishPrice}
    decrementCartItemQuantity(itemDetailsToReduce)
  }
  return (
    <li>
      <h1>{dishName}</h1>
      <img src={dishImage} alt={dishImage} />
      <div className="quantity-buttons-container">
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
    </li>
  )
}
export default EachCartItem
