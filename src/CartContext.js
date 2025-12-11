import React from 'react'

const CartContext = React.createContext({
  restaurantDetails: {},
  setRestaurantDetails: () => {},
  cartList: [],
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
})
export default CartContext
