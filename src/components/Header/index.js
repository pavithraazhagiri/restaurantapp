import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import CartContext from '../../CartContext'
import './index.css'

const Header = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, restaurantDetails} = value
      const restaurantName = restaurantDetails
        ? restaurantDetails.restaurantName
        : ''

      const cartLength = cartList.length
      return (
        <div className="header-container">
          <Link to="/">
            <h1 className="header-heading">{restaurantName}</h1>
          </Link>
          <div className="cart-container">
            <p className="my-orders">My Orders</p>
            <Link to="/cart">
              <div className="cart-wrapper">
                <button data-testid="cart" type="button">
                  <AiOutlineShoppingCart className="cart-icon" />
                </button>
                <p className="cart-length">{cartLength}</p>
              </div>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Header
