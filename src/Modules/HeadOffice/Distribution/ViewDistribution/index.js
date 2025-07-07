import React from 'react'
import { ToastContainer } from 'react-toastify'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import DistributTables from './Partials/DistTable'

const DistributTable = ({getDistribute,setDistribute}) => {
  return (
    <div>
<<<<<<< HEAD
        <TopTitle Heading={'View Distributor'}/>
=======
        <TopTitle Heading={'View Customer'}/>
>>>>>>> c2084415200b4927070204d83a4aeb64c0a89595
        <DistributTables getDistribute={getDistribute} setDistribute={setDistribute}/>
        <ToastContainer/>
    </div>
  )
}

export default DistributTable