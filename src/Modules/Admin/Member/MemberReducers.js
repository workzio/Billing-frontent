import { SET_MEMBER } from "./action"


const initialState = {
    memberdetails: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
       
        case SET_MEMBER:
            return { ...state, memberdetails:[...state.memberdetails, action.payload] }
          
        default:
            return state
    }
}