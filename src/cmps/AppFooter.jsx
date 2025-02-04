
import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { TOGGLE_Cart_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    const dispatch = useDispatch()    
    const isCartShown = useSelector(storeState => storeState.isCartShown)
    const toysLength = useSelector(storeState => storeState.toyModule.toys.length)
    const shoppingCartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)


    return (
        <footer className='app-footer'>
            <h5>
                Currently {toysLength} toys in the shop
            </h5>
            <p>
                CocoRights to all 
            </p>
            <h5>
                <span>{shoppingCartLength}</span> Products in your Cart
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: TOGGLE_Cart_IS_SHOWN })
                }}>
                    ({(isCartShown) ? 'hide' : 'show'})
                </a>
            </h5>
            <ShoppingCart isCartShown={isCartShown} />
            <UserMsg />
        </footer>
    )
}
