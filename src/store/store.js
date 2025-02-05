import { legacy_createStore as createStore} from 'redux'
import userReducer from './reducers/user.reducer'
import toyReducer from './reducers/toy.reducer'

const initialState = {
    toyModule: toyReducer,
    isCartShown: false,
    userModule: userReducer,
}


//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'


function appReducer(state = initialState, cmd = {}) {
    var newToyModule = {}
    switch (cmd.type) {
        //* Toys
        case SET_TOYS:
            newToyModule = {...state.toyModule, toys: cmd.toys}
            return {...state, toyModule: newToyModule}
        case ADD_TOY:
            const newToys = [...state.toyModule.toys, cmd.toy]
            newToyModule = {...state.toyModule, toys: newToys}
            return {...state, toyModule: newToyModule}
        case REMOVE_TOY:
            newToyModule = {...state.toyModule, toys: state.toyModule.toys.filter(toy => toy._id !== cmd.toyId)}
            return {...state, toyModule: newToyModule}
        case UPDATE_TOY:
            newToyModule = {...state.toyModule, toys: state.toyModule.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)}
            return {...state, toyModule: newToyModule}

       default:
            return state
    }
}

export const store = createStore(appReducer)