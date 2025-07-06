import React from 'react'
import { ToastContainer } from 'react-toastify'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import DistributTables from './Partials/DistTable'

const DistributTable = ({getDistribute,setDistribute}) => {
  return (
    <div>
        <TopTitle Heading={'View Customer'}/>
        <DistributTables getDistribute={getDistribute} setDistribute={setDistribute}/>
        <ToastContainer/>
    </div>
  )
}

export default DistributTable