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

export const SET_COUNT_TOY = 'SET_COUNT_TOY'

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //* Toys
        case SET_TOYS:
            return {...state, toys: cmd.toys}
        case ADD_TOY:
            return {...state, toys: [...state.toys, cmd.toy]}
        case REMOVE_TOY:
            return {...state, toys: state.toys.filter(toy => toy._id !== cmd.toyId)}
        case UPDATE_TOY:
            return {...state, toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)}

       default:
            return state
    }
}

export const store = createStore(appReducer)