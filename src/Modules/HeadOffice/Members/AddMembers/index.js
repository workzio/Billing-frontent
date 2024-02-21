import React from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { AddMember } from './Partials/AddMember'

const Add_Member = () => {
  return (
    <div>
        <TopTitle Heading={'Add Member'}/>
        <CustomCardView width={'900px'}>
        <AddMember/>
        </CustomCardView>
    </div>
  )
}

export default Add_Member