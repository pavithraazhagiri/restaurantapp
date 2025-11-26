import {Component} from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Dishes from './components/Dishes'
import RestaurantContext from './RestaurantContext'
import './App.css'

class App extends Component {
  state = {
    restaurantDetails: {restaurantName: '', tableMenuList: []},
    activeTabId: '',
    cartList: [],
  }

  componentDidMount() {
    this.restaurantDetails()
  }

  changeActiveTabId = activeTabId => {
    this.setState({activeTabId})
  }

  addToCartList = itemDetails => {
    console.log(`itemdetails ${itemDetails}`)
    console.log(itemDetails)
    const {cartList} = this.state
    const currentItem = cartList.find(
      eachItem => eachItem.dishId === itemDetails.dishId,
    )
    if (currentItem === undefined) {
      const updatedCartList = [...cartList, {...itemDetails, quantity: 1}]
      this.setState({cartList: updatedCartList})
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

  decrementFromCartList = itemDetails => {
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
        const updatedCartList = cartList.filter(
          eachItem => eachItem.dishId !== itemDetails.dishId,
        )
        this.setState({cartList: updatedCartList})
      }
    }
  }

  restaurantDetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const responseData = await response.json()
    console.log(responseData)
    const restaurantName = responseData[0].restaurant_name
    const tableMenuList = responseData[0].table_menu_list.map(
      eachCategoryObj => ({
        menuCategory: eachCategoryObj.menu_category,
        menuCategoryId: eachCategoryObj.menu_category_id,
        categoryDishes: eachCategoryObj.category_dishes.map(eachDish => ({
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          dishCalories: eachDish.dish_calories,
          dishDescription: eachDish.dish_description,
          dishCurrency: eachDish.dish_currency,
          dishId: eachDish.dish_id,
          dishImage: eachDish.dish_image,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          addonCat: eachDish.addonCat,
        })),
      }),
    )
    const restaurantDetails = {restaurantName, tableMenuList}
    this.setState({
      restaurantDetails,
      activeTabId: tableMenuList[0].menuCategoryId,
    })
  }

  render() {
    const {restaurantDetails, activeTabId, cartList} = this.state
    return (
      <RestaurantContext.Provider
        value={{
          restaurantDetails,
          activeTabId,
          changeActiveTabId: this.changeActiveTabId,
          cartList,
          addToCartList: this.addToCartList,
          decrementFromCartList: this.decrementFromCartList,
        }}
      >
        <Header />
        <Navbar />
        <Dishes />
      </RestaurantContext.Provider>
    )
  }
}

export default App
