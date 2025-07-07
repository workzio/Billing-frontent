import React from 'react'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import AddCompany from './Partials/AddCompany'

const CmpyOutsource = ({setCompany}) => {
  return (
    <div>
<<<<<<< HEAD
      <TopTitle Heading={'Add Company'} />
=======
      <TopTitle Heading={'Add Distributor'} />
>>>>>>> c2084415200b4927070204d83a4aeb64c0a89595
      <CustomCardView width={'800px'} >
        <AddCompany setCompany={setCompany}/>
      </CustomCardView>
    </div>
  )
}

export default CmpyOutsource