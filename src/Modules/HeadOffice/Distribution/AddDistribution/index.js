import React from 'react'
import AddDistributionForm from './Partials/AddDistribution'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { TopTitle } from '../../../../Components/Form/TopTitle'

const AddDistribution = ({setUpdateDistribute}) => {
  return (
    <div>
<<<<<<< HEAD
      <TopTitle Heading={'Add Distributor'} /> 
=======
      <TopTitle Heading={'Add Customer'} /> 
>>>>>>> c2084415200b4927070204d83a4aeb64c0a89595
      <CustomCardView width={'800px'}>
        <AddDistributionForm setUpdateDistribute={setUpdateDistribute}  />
      </CustomCardView>
    </div>
  )
}

export default AddDistribution