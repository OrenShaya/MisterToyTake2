import { toyService } from "../../services/toy.service.js"

//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

//* Shopping Cart
export const TOGGLE_Cart_IS_SHOWN = 'TOGGLE_Cart_IS_SHOWN'
export const ADD_TOY_TO_Cart = 'ADD_TOY_TO_Cart'
export const REMOVE_TOY_FROM_Cart = 'REMOVE_TOY_FROM_Cart'
export const CLEAR_Cart = 'CLEAR_Cart'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isCartShown: false,
    shoppingCart: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    lastToys: []
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys
            }
        case ADD_TOY:

            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }

        //* Shopping Cart
        case TOGGLE_Cart_IS_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }

        case ADD_TOY_TO_Cart:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.toy]
            }

        case REMOVE_TOY_FROM_Cart:
            const shoppingCart = state.shoppingCart.filter(toy => toy._id !== action.toyId)
            return { ...state, shoppingCart }


        case CLEAR_Cart:
            return { ...state, shoppingCart: [] }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lastToys]
            }


        default:
            return state
    }
}

export default toyReducer()