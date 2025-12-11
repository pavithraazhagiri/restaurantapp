import {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './CartContext'
import './App.css'

class App extends Component {
  state = {
    restaurantDetails: {restaurantName: '', tableMenuList: []},
    cartList: [],
  }

  addCartItem = itemDetails => {
    const {cartList} = this.state
    const existingItem = cartList.find(
      item => item.dishId === itemDetails.dishId,
    )
    if (!existingItem) {
      const updatedCartList = [...cartList, {...itemDetails, quantity: 1}]
      this.setState({cartList: updatedCartList})
    }
  }

  incrementCartItemQuantity = itemDetails => {
    const {cartList} = this.state
    const currentItem = cartList.find(
      eachItem => eachItem.dishId === itemDetails.dishId,
    )
    if (currentItem === undefined) {
      this.addCartItem(itemDetails)
    } else {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.dishId === itemDetails.dishId) {
          const updatedItem = {
            ...eachItem,
            quantity: eachItem.quantity + 1,
          }
          return updatedItem
        }
        return eachItem
      })
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = itemDetails => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachItem => eachItem.dishId !== itemDetails.dishId,
    )
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = itemDetails => {
    const {cartList} = this.state
    const currentItem = cartList.find(
      eachItem => eachItem.dishId === itemDetails.dishId,
    )
    if (currentItem !== undefined) {
      if (currentItem.quantity > 1) {
        const updatedCartList = cartList.map(eachItem => {
          if (eachItem.dishId === itemDetails.dishId) {
            const updatedItem = {
              ...eachItem,
              quantity: eachItem.quantity - 1,
            }
            return updatedItem
          }
          return eachItem
        })
        this.setState({cartList: updatedCartList})
      } else {
        this.removeCartItem(itemDetails)
      }
    }
  }

  setRestaurantDetails = restaurantDetails => {
    this.setState({restaurantDetails})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {restaurantDetails, cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          restaurantDetails,
          setRestaurantDetails: this.setRestaurantDetails,
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
