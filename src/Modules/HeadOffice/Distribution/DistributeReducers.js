import { SET_DISTRIBUTOR, SET_UPDATE_DISTRIBUTOR } from "./actions"


const initialState = {
    Distributor: [],
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_DISTRIBUTOR:
            return { ...state, Distributor: action.payload }
        case SET_UPDATE_DISTRIBUTOR:
            return { ...state, Distributor: [...state.Distributor, action.payload] }
        default:
            return state
    }
}