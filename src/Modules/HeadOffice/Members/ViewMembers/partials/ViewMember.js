import React, { useEffect, useState } from 'react'
import { Table } from '../../../../../Components/Table'
import { Modal } from '../../../../../Components/Modal'
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { Popconfirm, Col } from 'antd';
import { Row } from '../../../../../Components/Row';
import { DeleteOutlined, EyeOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { AddMember } from '../../AddMembers/Partials/AddMember';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';

export const ViewMember = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);

  const [members, setSembers] = useState([])

  const [viewMemTrigger, setViewMemTrigger] = useState(1)


  const confirm = (e) => {
    request.delete(`member/delete/${e.memberid}`)
      .then(response => {
        toast.success('Member Deleted Successfully !')
        getMembersList()
      })
      .catch(error => console.log(error, 'error'))
  };

  const cancel = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getMembersList()
  }, [])

  const getMembersList = () => {
    request.get('rolelist')
      .then(response => {
        setSembers(response.data)
        console.log(response.data, 'rolelist');
      })
      .catch(error => console.log(error, 'errorr'))
  }

  const HandleUpdateMember = () => {
    getMembersList();
    handleOk();
  }

  const onViewDetails = (record) => {
    setModalContent(<ViewMemberModal record={record} />)
    setModalTitle("View Details");
    showModal();
  }


  const onEditDetails = (record) => {
    setViewMemTrigger(viewMemTrigger + 1)
    setModalContent(<AddMember record={record} viewMemTrigger={viewMemTrigger} HandleUpdateMember={HandleUpdateMember} />)
    setModalTitle("Edit Details");
    showModal();
  }

  const ViewMemberModal = ({ record }) => {
    console.log(record);
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
        {/* <Col span={24} md={12}>
          <h2>Password&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.password}</h1>
        </Col> */}
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
          <h1>{record.pan_no}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Description&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.description}</h1>
        </Col>
        .
      </Row>
    )
  }

  const columns = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Member ID',
      dataIndex: 'memberid'
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Contact Number',
      dataIndex: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Designation',
      dataIndex: 'role_name'
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <Flex center gap={'10px'}>
            <Button.Success text={<EyeOutlined />} onClick={() => onViewDetails(record)} />
            <Button.Primary text={<EditOutlined />} onClick={() => onEditDetails(record)} />
            {/* <Popconfirm
              title="Delete Member"
              description="Are you sure to delete the member?"
              onConfirm={() => confirm(record)}
              onCancel={cancel}
              icon={
                <QuestionCircleOutlined size={'30'}
                  style={{
                    color: 'red',
                  }}
                />
              }
              placement="topLeft"
              okText="Yes"
              cancelText="No"
            >
              <Button.Danger text={<DeleteOutlined />} />
            </Popconfirm> */}

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
      <Table columns={columns} data={members} />
      <Modal width={800} isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}
