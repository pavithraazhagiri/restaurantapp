import CartContext from '../../CartContext'
import './index.css'

const Navbar = props => {
  const {activeTabId, changeActiveTabId} = props

  const changeCategory = id => {
    changeActiveTabId(id)
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {restaurantDetails} = value
        const {tableMenuList} = restaurantDetails
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
    </CartContext.Consumer>
  )
}

export default Navbar
