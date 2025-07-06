import React from 'react'
import AddDistributionForm from './Partials/AddDistribution'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { TopTitle } from '../../../../Components/Form/TopTitle'

const AddDistribution = ({setUpdateDistribute}) => {
  return (
    <div>
      <TopTitle Heading={'Add Customer'} /> 
      <CustomCardView width={'800px'}>
        <AddDistributionForm setUpdateDistribute={setUpdateDistribute}  />
      </CustomCardView>
    </div>
  )
}

export default AddDistribution