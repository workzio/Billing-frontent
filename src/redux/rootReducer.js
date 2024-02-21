import { combineReducers } from 'redux'
import authReducer from '../Modules/Auth/reducers'
import DistributeReducers from '../Modules/HeadOffice/Distribution/DistributeReducers'
import ProductReducers from '../Modules/HeadOffice/Product/ProductReducers'
import CompanyReducer from '../Modules/HeadOffice/Company/CompanyReducers'
import CompanyProfileReducer from '../Modules/HeadOffice/CompanyProfile/reducers'

export default combineReducers({
  auth: authReducer,
  product: ProductReducers,
  Distributee: DistributeReducers,
  Company:CompanyReducer,
  companyprofile:CompanyProfileReducer,
})
