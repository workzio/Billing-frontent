import React, { useState } from 'react'
import { AddPurchase } from '../../../AddPurchase';
import { Row } from '../../../../../../Components/Row';
import { Col } from 'antd';
import { Pgragp } from './Style';
import Flex from '../../../../../../Components/Flex';
import { MailOutlined, ShoppingOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Modal } from '../../../../../../Components/Modal';
import { AiFillPushpin } from 'react-icons/ai'

const TopSection = () => {
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onViewRow = () => {
    setModalTitle("Add Bank Details");
    setModalContent(<AddPurchase />);
    showModal();
  }
  return (
    <div style={{padding:'10px 7px'}}>
      <Row style={{ padding: '0 10px' }}>
        <Col span={24} md={12} style={{ paddingTop: '20px' }}>
          <h3>Name: Saranya</h3>
        </Col>
      </Row>
      <Pgragp>
        <Row style={{ padding: '0 10px' }}>
          <Col span={24} md={12} style={{ paddingTop: '10px' }}>
            <Flex>
              <p><b>Phone :</b></p>
              <p style={{ color: '#8056F7', fontWeight: '500', fontSize: '15px' }}>&nbsp;+91 9876543210</p>
            </Flex>
          </Col>
          <Col span={24} md={12} style={{ paddingTop: '10px' }}>
            <Flex flexEnd centerVertically>
              <p><b>Address :&nbsp;</b></p>
              <p style={{ color: '#8056F7', fontWeight: '500', fontSize: '15px', cursor: 'pointer' }}
                onClick={() => onViewRow()}
              >&nbsp;Add address</p>
            </Flex>
          </Col>
        </Row>
        <Row style={{ padding: '0 10px' }}>
          <Col span={24} md={12} style={{ paddingTop: '10px' }}>
            <Flex centerVertically>
              <p><b>Email :&nbsp;</b></p>
              <p style={{ color: '#8056F7', fontWeight: '500', fontSize: '15px', cursor: 'pointer' }}
                onClick={() => onViewRow()}
              >&nbsp;Add Email ID</p>
            </Flex>
          </Col>
          <Col span={24} md={12} style={{ paddingTop: '10px' }}>
            <Flex flexEnd centerVertically>
              <p><b>Gstin :&nbsp;</b></p>
              <p style={{ color: '#8056F7', fontWeight: '500', fontSize: '15px', cursor: 'pointer' }}
                onClick={() => onViewRow()}
              >&nbsp;Add GSTIN</p>
            </Flex>
          </Col>
        </Row>
        <Row style={{ padding: '0 10px' }}>
          <Col span={24} md={12} style={{ paddingTop: '10px' }}>
            <Flex centerVertically>
              <p><b>PinCode :&nbsp;</b></p>
              <p style={{ color: '#8056F7', fontWeight: '500', fontSize: '15px', cursor: 'pointer' }}
                onClick={() => onViewRow()}
              >&nbsp;Add PinCode</p>
            </Flex>
          </Col>
        </Row><br />
      </Pgragp>
      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />

    </div>
  )
}

export default TopSection