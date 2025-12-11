import {Component} from 'react'
import {FaCircle} from 'react-icons/fa'
import CartContext from '../../CartContext'
import './index.css'

class EachDish extends Component {
  render() {
    const {dishDetails} = this.props
    const {
      addonCat,
      dishAvailability,
      dishCalories,
      dishCurrency,
      dishDescription,
      dishId,
      dishImage,
      dishName,
      dishPrice,
      dishType,
    } = dishDetails

    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartList,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value
          const presentItem = cartList.find(
            eachItem => eachItem.dishId === dishId,
          )
          const quantity = presentItem ? presentItem.quantity : 0
          const add = () => {
            const itemDetails = {dishId, dishName, dishPrice, dishImage}
            incrementCartItemQuantity(itemDetails)
          }
          const reduce = () => {
            if (quantity === 0) {
              return
            }
            const itemDetails = {dishId, dishName, dishPrice, dishImage}
            decrementCartItemQuantity(itemDetails)
          }
          const circleContainerClasses =
            dishType === 1
              ? 'circle-container circle-container-red'
              : 'circle-container circle-container-green'
          const circleIconClass =
            dishType === 1 ? 'circle-icon-red' : 'circle-icon-green'
          return (
            <li className="dish-container">
              <div className={circleContainerClasses}>
                <FaCircle className={circleIconClass} />
              </div>
              <div className="dish-description-container">
                <h1 className="dish-name">{dishName}</h1>
                <p className="dish-price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-description">{dishDescription}</p>
                {dishAvailability ? (
                  <>
                    <div className="quantity-buttons-container">
                      <button
                        type="button"
                        data-testid="decrement-quantity"
                        className="quantity-button-minus"
                        onClick={reduce}
                      >
                        -
                      </button>
                      <p className="quantity" data-testid="item-quantity">
                        {quantity}
                      </p>
                      <button
                        type="button"
                        data-testid="increment-quantity"
                        className="quantity-button-plus"
                        onClick={add}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={add}
                      data-testid="add-to-cart"
                    >
                      ADD TO CART
                    </button>
                  </>
                ) : (
                  <>
                    <p className="not-available">Not available</p>
                  </>
                )}
                {addonCat.length > 0 && (
                  <p className="customizations">Customizations available</p>
                )}
              </div>
              <div className="calories-container">
                <p className="dish-calories">{dishCalories} calories</p>
              </div>
              <div className="dish-image-container">
                <img src={dishImage} alt={dishId} className="dish-image" />
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default EachDish
