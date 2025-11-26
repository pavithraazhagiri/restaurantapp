import RestaurantContext from '../../RestaurantContext'
import './index.css'

const Navbar = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {restaurantDetails, activeTabId, changeActiveTabId} = value
      const {tableMenuList} = restaurantDetails
      const changeCategory = id => {
        changeActiveTabId(id)
      }
      return (
        <nav className="nav-container">
          <ul className="table-menu-list">
            {tableMenuList.map(eachMenu => {
              const listClassNames =
                activeTabId === eachMenu.menuCategoryId
                  ? 'each-menu-item border-class'
                  : 'each-menu-item'
              const buttonClassNames =
                activeTabId === eachMenu.menuCategoryId
                  ? 'menu-button red-button'
                  : 'menu-button'
              return (
                <li key={eachMenu.menuCategoryId} className={listClassNames}>
                  <button
                    type="button"
                    className={buttonClassNames}
                    onClick={() => changeCategory(eachMenu.menuCategoryId)}
                  >
                    {eachMenu.menuCategory}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      )
    }}
  </RestaurantContext.Consumer>
)

export default Navbar
