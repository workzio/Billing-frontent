import React, { useState } from 'react'
import { Table } from '../../../../../Components/Table'
import { Col, Modal as Modals } from 'antd'
import Button from '../../../../../Components/Form/Button';
import Flex from '../../../../../Components/Flex';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Modal } from '../../../../../Components/Modal';
import { useEffect } from 'react';
import AddDistributionForm from '../../AddDistribution/Partials/AddDistribution';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';
import { Row } from '../../../../../Components/Row';

const DistributTables = ({ getDistribute, setDistribute }) => {

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
    GetDistributor()
  };

  const onViewDetails = (record) => {
    setModalContent(<ModalViewContent record={record} />);
    setModalTitle("View Details");
    showModal();
  }

  useEffect(() => {
    GetDistributor();
  }, [])

  const GetDistributor = () => {
    request.get('Distribution')
      .then(function (response) {
        if (response.status == 200) {
          setDistribute(response.data)
        }
        else {
          console.log('Distributes details failed');
        }
      })
      .catch(function (error) {
        console.log(error, 'failedddd');
      });
  }

  const handleGetTable = () => {
    GetDistributor();
    handleOk();
  }

  const ModalViewContent = ({ record, Name }) => {
    return (

      <Row gutter={[12, 12]}>
        <Col span={24} md={12}>
          <h2> Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.name}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Contact No&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.phoneno}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Pincode&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.pincode}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>GSTIN / UIN&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.gst_no}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Email&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.email}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>State Code&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.code}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>Address&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.address}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>District&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.district}</h1>
        </Col>
        <Col span={24} md={12}>
          <h2>State&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.state}</h1>
        </Col>
      </Row>
    )
  }

  const [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: 'S.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Contact no',
      dataIndex: 'phoneno',
    },
    {
      title: 'State code',
      dataIndex: 'code',
    },,
    {
      title: 'Action',
      render: (_, record) => {
        return (
          <Flex center gap={'10px'}>
            <Button.Success onClick={() => { onViewDetails(record) }} text={<EyeOutlined />} />
            <Button.Primary onClick={() => { onEditDistributor(record) }} text={<EditOutlined />} />
          </Flex>
        );
      },

    }
  ]

  const onEditDistributor = (record) => {
    showModal();
    setModalTitle("update");
    setModalContent(<AddDistributionForm data={record} handleOk={handleOk} handleGetTable={handleGetTable} />);
  }

  useEffect(() => {
    setDataSource(getDistribute)
  }, [getDistribute])

  return (
    <div style={{ margin: '30px 0' }}>
      <Table columns={columns} data={dataSource} />
      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}
export default DistributTables