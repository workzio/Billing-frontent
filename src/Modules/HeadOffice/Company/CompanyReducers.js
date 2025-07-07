import { SET_COMPANY } from "./actions"


const initialState = {
    AddCompanies: [],
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_COMPANY:
            return { ...state, AddCompanies: action.payload}

        default:
            return state
    }
}