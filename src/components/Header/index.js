import {AiOutlineShoppingCart} from 'react-icons/ai'
import RestaurantContext from '../../RestaurantContext'
import './index.css'

const Header = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {restaurantDetails, cartList} = value
      const {restaurantName} = restaurantDetails

      const cartLength = cartList.reduce((sum, item) => sum + item.quantity, 0)
      return (
        <div className="header-container">
          <h1 className="header-heading">{restaurantName}</h1>
          <div className="cart-container">
            <p className="my-orders">My Orders</p>
            <div className="cart-wrapper">
              <AiOutlineShoppingCart className="cart-icon" />
              <p className="cart-length">{cartLength}</p>
            </div>
          </div>
        </div>
      )
    }}
  </RestaurantContext.Consumer>
)

export default Header
