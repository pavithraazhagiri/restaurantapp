import {Component} from 'react'
import {FaCircle} from 'react-icons/fa'
import RestaurantContext from '../../RestaurantContext'
import './index.css'

class EachDish extends Component {
  // state = {quantity: 0}

  // incrementQuantity = () => {
  //   this.setState(prevState => ({quantity: prevState.quantity + 1}))
  // }

  // decrementQuantity = () => {
  //   const {quantity} = this.state
  //   if (quantity > 0) {
  //     this.setState(prevState => ({
  //       quantity: prevState.quantity - 1,
  //     }))
  //   }
  // }

  render() {
    console.log('render')
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
      <RestaurantContext.Consumer>
        {value => {
          const {cartList, addToCartList, decrementFromCartList} = value
          const presentItem = cartList.find(
            eachItem => eachItem.dishId === dishId,
          )
          const quantity = presentItem === undefined ? 0 : presentItem.quantity
          const add = () => {
            const itemDetails = {dishId, dishName, dishPrice}
            addToCartList(itemDetails)
          }
          const reduce = () => {
            if (quantity === 0) {
              return
            }
            const itemDetails = {dishId, dishName, dishPrice}
            decrementFromCartList(itemDetails)
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
                  <div className="quantity-buttons-container">
                    <button
                      type="button"
                      className="quantity-button-minus"
                      onClick={reduce}
                    >
                      -
                    </button>
                    <p className="quantity">{quantity}</p>
                    <button
                      type="button"
                      className="quantity-button-plus"
                      onClick={add}
                    >
                      +
                    </button>
                  </div>
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
      </RestaurantContext.Consumer>
    )
  }
}

export default EachDish
