import request from "../../../utils/request"

export const SET_COMPANY_PROFILE = 'SET_COMPANY_PROFILE'



export const setCompanyProfile = value => {
    return {
        type: SET_COMPANY_PROFILE,
        payload: value,
    }
}
