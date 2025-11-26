import RestaurantContext from '../../RestaurantContext'
import EachDish from '../EachDish'
import './index.css'

const Dishes = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {restaurantDetails, activeTabId} = value
      const {tableMenuList} = restaurantDetails
      const categoryMenuDetails = tableMenuList.find(
        eachMenu => activeTabId === eachMenu.menuCategoryId,
      )
      console.log(categoryMenuDetails)
      if (categoryMenuDetails === undefined) {
        return null
      }
      const {categoryDishes} = categoryMenuDetails
      console.log(categoryDishes)
      return (
        <div className="dishes-container">
          <ul className="dishes-ul-list-container">
            {categoryDishes.map(eachDish => (
              <EachDish key={eachDish.dishId} dishDetails={eachDish} />
            ))}
          </ul>
        </div>
      )
    }}
  </RestaurantContext.Consumer>
)
export default Dishes
