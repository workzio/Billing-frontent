
export const SET_PRODUCT= 'SET_PRODUCT'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_UNIT = 'SET_UNIT'
export const SET_PRODUCT_CAT = 'SET_PRODUCT_CAT'



export const setProduct = product => {
  return {
    type: SET_PRODUCT,
    payload: product,
  }
}

export const setCategory = category => {

  return {
    type: SET_CATEGORY,
    payload: category,
  }
}

export const setUnit = unit => {

  return {
    type: SET_UNIT,
    payload: unit,
  }
}

export const setProductCategory = product => {
  return {
    type: SET_PRODUCT_CAT,
    payload: product,
  }
}

