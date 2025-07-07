import React from 'react'
import Flex from '../../../../../Components/Flex'
import { Col, Form } from 'antd'
import { Row } from '../../../../../Components/Row'
import { Paradesn } from '../../../RegisterForm/Style'


const Modal_view_distri = () => {
  return (
    <div>
      <Form>
        <Paradesn>
          <Row gutter={[24, 24]} style={{ backgroundColor: 'white', padding: '25px' }}>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Name :</h2>&nbsp;&nbsp;<p>Kamla</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Distributor ID :</h2>&nbsp;&nbsp;<p>IO089Y</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Contact No :</h2>&nbsp;&nbsp;<p>987654321</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>GST No :</h2>&nbsp;&nbsp;<p>NHV8684</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Email id :</h2>&nbsp;&nbsp;<p>Kamla@gmail.com</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>State :</h2>&nbsp;&nbsp;<p>Kerala</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>District :</h2>&nbsp;&nbsp;<p>Chennai</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Pincode :</h2>&nbsp;&nbsp;<p>629076</p>
              </Flex>
            </Col>
          </Row>
        </Paradesn>
      </Form>
    
    </div>
  )
}

export default Modal_view_distri