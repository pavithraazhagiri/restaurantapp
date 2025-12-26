import EachDish from '../EachDish'
import CartContext from '../../CartContext'
import './index.css'

const Dishes = props => {
  const {activeTabId} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {restaurantDetails} = value
        const {tableMenuList} = restaurantDetails
        const categoryMenuDetails = tableMenuList.find(
          eachMenu => activeTabId === eachMenu.menuCategoryId,
        )
        if (categoryMenuDetails === undefined) {
          return null
        }
        const {categoryDishes} = categoryMenuDetails
        if (categoryDishes === undefined) {
          return null
        }
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
    </CartContext.Consumer>
  )
}
export default Dishes
