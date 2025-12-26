import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../CartContext'
import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, restaurantDetails} = value
      const restaurantName = restaurantDetails
        ? restaurantDetails.restaurantName
        : ''

      const cartLength = cartList.length
      const onLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      return (
        <div className="header-container">
          <Link to="/" className="header-heading-link">
            <h1 className="header-heading">{restaurantName}</h1>
          </Link>
          <div className="cart-button-container">
            <div className="cart-container">
              <p className="my-orders">My Orders</p>
              <Link to="/cart">
                <div className="cart-wrapper">
                  <button
                    data-testid="cart"
                    type="button"
                    className="cart-button"
                  >
                    <AiOutlineShoppingCart className="cart-icon" />
                  </button>
                  <p className="cart-length">{cartLength}</p>
                </div>
              </Link>
            </div>
            <button type="button" className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
