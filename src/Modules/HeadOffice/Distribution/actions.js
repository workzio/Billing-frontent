
export const SET_DISTRIBUTOR = 'SET_DISTRIBUTOR'
export const SET_UPDATE_DISTRIBUTOR = 'SET_UPDATE_DISTRIBUTOR'


export const setDistribute = product => {

  return {
    type: SET_DISTRIBUTOR,
    payload: product,
  }
}

export const setUpdateDistribute = product => {

  return {
    type: SET_UPDATE_DISTRIBUTOR,
    payload: product,
  }
}

