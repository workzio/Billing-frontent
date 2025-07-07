import { Col } from 'antd'
import React from 'react'
import { Row } from '../../../../Components/Row'
import ViewCategory from './Partials/ViewCategory'
import ViewProductsDetails from './Partials/ViewProducts'
import ViewUnits from './Partials/ViewUnits'
import { useState } from 'react'

const Admin_ViewProduct = ({ getProduct,getUnit,getCategory, setProduct }) => {


  const [trigger, setTrigger] = useState(0)

  const handleTrigger =()=>{
    setTrigger(trigger + 1)
  }


  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col span={24} md={24}>
          <ViewProductsDetails getProduct={getProduct} trigger={trigger} setProduct={setProduct} />
        </Col>

        <Col span={24} md={12}>
          <ViewCategory getCategory={getCategory} handleTrigger={handleTrigger}/>
        </Col>

        <Col span={24} md={12}>
          <ViewUnits handleTrigger={handleTrigger}/>
        </Col>
      </Row>
    </div>
  )
}

export default Admin_ViewProduct