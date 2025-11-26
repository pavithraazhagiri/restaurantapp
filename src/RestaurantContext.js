import React from 'react'

const RestaurantContext = React.createContext({
  restaurantDetails: {},
  activeTabId: '',
  changeActiveTabId: () => {},
  cartList: [],
  addToCartList: () => {},
  decrementFromCartList: () => {},
})
export default RestaurantContext
