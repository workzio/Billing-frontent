import React, { useEffect, useState } from 'react'
import { Table } from '../../../../../Components/Table'
import { Modal } from '../../../../../Components/Modal'
import request from '../../../../../utils/request'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Col } from 'antd'
import { Row } from '../../../../../Components/Row'
import { Addsalary } from '../../AddSalary/Partials/Addsalary'

export const ViewSalary = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);

  const [salary, setSalary] = useState([])

  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    getSalary()
  }, [])

  const getSalary = () => {
    request.get('member/alldetails')
      .then(response => {
        console.log(response.data, 'SALARY');
        setSalary(response.data)
      })
      .catch(error => console.log(error, 'error'))
  }

  const handleleSalaryUpdate = () => {
    getSalary()
    handleOk()
  }

  const onViewDetails = (record) => {
    setModalContent(<ViewSalaryModal record={record} />)
    setModalTitle("View Details");
    showModal();
  }

  const onEditDetails = (record) => {
    setTrigger(trigger + 1)
    setModalContent(<Addsalary record={record} trigger={trigger} handleleSalaryUpdate={handleleSalaryUpdate} />)
    setModalTitle("View Details");
    showModal();
  }

  const ViewSalaryModal = ({ record }) => {
    return (
      <Row gutter={[24, 24]}>
        <Col span={24} md={12}>
          <h2>Member Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.name}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Member ID&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.memberid}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Designation&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.role_name}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Date of Birth&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.dob}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Address&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.address}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Email&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.email}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Gender&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.gender}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Phone Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.phone}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Aadhar Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.aadharno}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>PAN Number&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.panNo}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Added On&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.salary_date}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Description&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.description}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Advance Amount&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.advance_amount}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Full Payment&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.full_payment}</h1>
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
      title: 'Employee Name',
      dataIndex: 'name'
    },
    {
      title: 'Designation',
      dataIndex: 'role_name'
    },
    {
      title: 'Advance',
      dataIndex: 'advance_amount'
    },
    {
      title: 'Full Payment',
      dataIndex: 'full_payment'
    },

    {
      title: 'Action',
      render: (record) => {
        return (
          <Flex center gap={'10px'}>
            <Button.Success text={<EyeOutlined />} onClick={() => onViewDetails(record)} />
            {/* <Button.Primary text={<EditOutlined />} onClick={() => onEditDetails(record)} /> */}
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
      <Table columns={columns} data={salary} />
      <Modal width={800} isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}
