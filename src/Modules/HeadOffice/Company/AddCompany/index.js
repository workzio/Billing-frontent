import React from 'react'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import AddCompany from './Partials/AddCompany'

const CmpyOutsource = ({setCompany}) => {
  return (
    <div>
      <TopTitle Heading={'Add Distributor'} />
      <CustomCardView width={'800px'} >
        <AddCompany setCompany={setCompany}/>
      </CustomCardView>
    </div>
  )
}

export default CmpyOutsource