import { LOGOUT_SUCCESS, SIGN_IN_SUCCESS } from './actions'

const initialState = {
  token: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.token,
      }
    case LOGOUT_SUCCESS:
      return {}
    default:
      return state
  }
}
