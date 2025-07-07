import { Col, Form } from 'antd'
import React from 'react'
import { Paradesn } from '../../Style'
import { Row } from '../../../../../Components/Row'
import Flex from '../../../../../Components/Flex'

const ModalViewDatas = ({ record }) => {
  return (
    <div>
      <Form
        name="sales"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}>
        <Paradesn>
          <Row gutter={[24, 24]} style={{ backgroundColor: 'white', padding: '25px' }}>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Name :</h2>&nbsp;&nbsp;<p>Kamla</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Member ID :</h2>&nbsp;&nbsp;<p>87VEXVJ</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Aadhar :</h2>&nbsp;&nbsp;<p>bioadewfb87932</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>D.O.B :</h2>&nbsp;&nbsp;<p>4/8/1998</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Pan Id :</h2>&nbsp;&nbsp;<p>TFU4557808</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Phn.no :</h2>&nbsp;&nbsp;<p>9876543210</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Email id :</h2>&nbsp;&nbsp;<p>demo86@gmail.com</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Gender :</h2>&nbsp;&nbsp;<p>Female</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Designation :</h2>&nbsp;&nbsp;<p>Marketing</p>
              </Flex>
            </Col>
            <Col span={12} md={12}>
              <Flex centerVertically>
                <h2>Status :</h2>&nbsp;&nbsp;<p>Single</p>
              </Flex>
            </Col>
          </Row>
        </Paradesn>
      </Form>
    
    </div>
  )
}

export default ModalViewDatas