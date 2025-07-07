import { SET_PRODUCT, SET_CATEGORY, SET_PRODUCT_CAT, SET_UNIT } from "./action"


const initialState = {
    productdetails: [],
    categorydetails: [],
    unitlist: [],
    categoryProductdetails: [],
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_PRODUCT:
            return { ...state, productdetails: action.payload }
        case SET_PRODUCT_CAT:
            return { ...state, categoryProductdetails: action.payload }
        case SET_UNIT:
            return { ...state, unitlist: action.payload}
        case SET_CATEGORY:
            return { ...state, categorydetails: [...state.categorydetails, action.payload] }

        default:
            return state
    }
}
