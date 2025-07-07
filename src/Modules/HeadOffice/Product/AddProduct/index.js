import React from 'react'
import AddProduct from './Partials/AddProduct'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { CustomCardView } from '../../../../Components/CustomCardView'

const Admin_AddProduct = ({ getProduct, setProduct }) => {
  return (
    <div>
      <TopTitle Heading={'Add Products'} />
      <CustomCardView width={'800px'}>
        <AddProduct getProduct={getProduct} setProduct={setProduct} />
      </CustomCardView>
    </div>
  )
}

export default Admin_AddProduct