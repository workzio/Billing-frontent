/* eslint-disable no-unused-vars */
import request from '../../utils/request'
import initializeApp from '../../utils/initializeApp'
import { toast } from 'react-toastify'

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const SignInSuccess = token => {
  return {
    type: SIGN_IN_SUCCESS,
    token,
  }
}

export const LogOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export const SignIn = data => async dispatch => {
  try {
    const authData = await request.post(`login`, {
      ...data,
    })
    // Mock API, add the origin API and payload data
    if (authData?.data?.token !== '') {
      initializeApp(authData?.data?.token) // pass the token to this function
      toast.success(`Login Successful, Welcome ${authData?.data?.username}`)
      dispatch(SignInSuccess(authData?.data))
    }
    else {
      toast.error('UserName or Password is incorrect ')
    }

  } catch (error) {
    toast.error('Getting error while login, Please Login Again')

    console.error('Getting error while login', error)
  }
}
