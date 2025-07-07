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
import { OnlineTransaction } from '../../Bank/Partials/OnlineTransaction';

export const ViewOnlineTransaction = ({ activeKey }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);

  const [onlineTransaction, setOnlineTransaction] = useState([])

  const [trigger, setTrigger] = useState([])

  useEffect(() => {
    GetOnlineTransaction()
  }, [activeKey])


  const GetOnlineTransaction = () => {
    request.get('online/alldetails')
      .then(response => {
        console.log(response.data, 'online transaction');
        setOnlineTransaction(response.data)
      })
      .catch(error => console.log(error, 'error'))
  }

  const HandleUpdateOnlineTransac = () => {
    GetOnlineTransaction()
    handleOk()
  }

  const onViewDetails = (record) => {
    console.log(record, 'recordd');
    setModalContent(<ViewTransactionModal record={record} />)
    setModalTitle("View Details");
    showModal();
  }

  const onEditDetails = (record) => {
    setTrigger(trigger + 1)
    setModalContent(<OnlineTransaction record={record} trigger={trigger} HandleUpdateOnlineTransac={HandleUpdateOnlineTransac}/>)
    setModalTitle("Edit Details");
    showModal();
  }

  const ViewTransactionModal = ({ record }) => {
    console.log(record);
    return (
      <Row gutter={[24, 24]}>

        <Col span={24} >
          <h5 style={{ fontSize: '18px' }}>Account Holder Details</h5>
        </Col>
        <Col span={24} md={12}>
          <h2>Account Holder Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.own_account_holder_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Account Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.own_account_number}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Bank Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.own_bank_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Branch Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.own_branch_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>IFSC Code&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.own_ifsc_code}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Phone Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.own_phone_number}</h1>
        </Col>


        <Col span={24} >
          <h5 style={{ fontSize: '18px' }}>Customer Details</h5>
        </Col>
        <Col span={24} md={12}>
          <h2>Account Holder Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.customer_account_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Account Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.customer_account_number}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Bank Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.customer_bank_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Branch Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.customer_branch_name}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>IFSC Code&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.customer_ifsc_code}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Phone Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.customer_phone_number}</h1>
        </Col>

        <Col span={24} >
          <h5 style={{ fontSize: '18px' }}>Payment Details</h5>
        </Col>
        <Col span={24} md={12}>
          <h2>Transaction Date&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.date}</h1>
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
          <h1>{record.amount}</h1>
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
      dataIndex: 'date'
    },

    {
      title: 'Payment Type',
      dataIndex: 'payment_type'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
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
      <Table columns={columns} data={onlineTransaction} />
      <Modal width={800} isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}
