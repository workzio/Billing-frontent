import React from 'react'
import MainLayout from '../../../../../Components/MainLayout/MainLayout'
import SideSection from './Sections/SideSection'
import TopSection from './Sections/TopSection'
import BottomSection from './Sections/BottomSection'

const PurchaseReport = () => {
  return (
    <div>
        <MainLayout sideBox = {<SideSection/>} headBox={<TopSection />} secondbox={<BottomSection/>} />
    </div>
  )
}

export default PurchaseReport