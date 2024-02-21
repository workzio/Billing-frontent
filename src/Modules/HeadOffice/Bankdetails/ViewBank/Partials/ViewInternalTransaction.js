import React, { useEffect, useState } from 'react'
import { Table } from '../../../../../Components/Table'
import { Modal } from '../../../../../Components/Modal'
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { Popconfirm, Col } from 'antd';
import { Row } from '../../../../../Components/Row';
import { DeleteOutlined, EyeOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify'
import { AddBankDetails } from '../../AddBank/Partials/AddBankDetails';

export const ViewInternalTransaction = ({ activeKey }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);

  const [internalTransaction, setInternalTransaction] = useState([])

  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    GetInternalTransaction()
  }, [activeKey])

  const GetInternalTransaction = () => {
    request.get('all/internal/transcation')
      .then(response => {
        console.log(response.data, 'internal transaction');
        setInternalTransaction(response.data)
      })
      .catch(error => console.log(error, 'error'))
  }

  const handleUpdateInternalTrans = () => {
    GetInternalTransaction()
    handleOk()
  }

  const onViewDetails = (record) => {
    setModalContent(<ViewTransactionModal record={record} />)
    setModalTitle("View Details");
    showModal();
  }

  const onEditDetails = (record) => {
    setTrigger(trigger + 1)
    setModalContent(<AddBankDetails record={record} trigger={trigger} handleUpdateInternalTrans={handleUpdateInternalTrans} />)
    setModalTitle("Edit Details");
    showModal();
  }

  const ViewTransactionModal = ({ record }) => {
    console.log(record);
    return (
      <Row gutter={[24, 24]}>
        <Col span={24} md={12}>
          <h2>Account Holder Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.account_holder_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Account Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.account_number}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Account Type&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.account_type}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Bank Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.bank_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Branch Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.branch_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>IFSC Code&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.ifsc_code}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Transaction Date&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.in_transcation_date}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Phone Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.phone_number}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Payment Type&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.payment_type}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Amount&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.in_transcation_amount}</h1>
        </Col>

      </Row>
    )
  }

  const columns = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Date',
      dataIndex: 'in_transcation_date'
    },
    {
      title: 'Bank Name',
      dataIndex: 'bank_name'
    },
    {
      title: 'Payment Type',
      dataIndex: 'payment_type'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number'
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <Flex center gap={'10px'}>
            <Button.Success text={<EyeOutlined />} onClick={() => onViewDetails(record)} />
            <Button.Primary text={<EditOutlined />} onClick={() => onEditDetails(record)} />
          </Flex>
        );
      },
    },
  ]

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <div style={{ margin: '30px 0' }}>
      <Table columns={columns} data={internalTransaction} />
      <Modal width={800} isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}
