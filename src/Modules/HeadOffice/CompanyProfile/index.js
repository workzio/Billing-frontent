import React from 'react'
import { CustomCardView } from '../../../Components/CustomCardView'
import { TopTitle } from '../../../Components/Form/TopTitle'
import CompanyProfile from './Partial/CompanyProfile'

const HeadOfficeCompanyProfile = ({getCompanyProfile,setCompanyProfile}) => {
  return (
    <div>
      <TopTitle Heading={'Company Profile'} />
      <CustomCardView width={'800px'}>
        <CompanyProfile getCompanyProfile={getCompanyProfile} setCompanyProfile={setCompanyProfile}/>
      </CustomCardView>
    </div>
  )
}

export default HeadOfficeCompanyProfile