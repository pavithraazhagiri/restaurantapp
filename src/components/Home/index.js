import {Component} from 'react'
import Header from '../Header'
import Navbar from '../Navbar'
import Dishes from '../Dishes'
import CartContext from '../../CartContext'

class Home extends Component {
  state = {
    activeTabId: '',
  }

  componentDidMount() {
    this.restaurantDetails()
  }

  changeActiveTabId = activeTabId => {
    this.setState({activeTabId})
  }

  restaurantDetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const responseData = await response.json()
    console.log('responsedata')
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
    const {setRestaurantDetails} = this.context
    setRestaurantDetails(restaurantDetails)
    this.setState({
      activeTabId: tableMenuList[0].menuCategoryId,
    })
  }

  render() {
    const {activeTabId} = this.state
    const {restaurantDetails} = this.context
    if (!restaurantDetails.tableMenuList.length) {
      return null
    }
    return (
      <>
        <Header />
        <Navbar
          activeTabId={activeTabId}
          changeActiveTabId={this.changeActiveTabId}
        />
        <Dishes activeTabId={activeTabId} />
      </>
    )
  }
}

Home.contextType = CartContext

export default Home
