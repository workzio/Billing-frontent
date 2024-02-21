import React, { useState } from 'react'
import { Row } from '../../../../../Components/Row'
import { Col } from 'antd'
import { Table } from '../../../../../Components/Table'
import Button from '../../../../../Components/Form/Button'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import Flex from '../../../../../Components/Flex'
import { Modal } from '../../../../../Components/Modal'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { useEffect } from 'react'
import request from '../../../../../utils/request'
import AddProduct from '../../AddProduct/Partials/AddProduct'

const ViewProductsDetails = ({ setProduct, trigger }) => {

  const [dataSource, setDataSource] = useState([])
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
    getProductsList();
  };

  useEffect(() => {
    getProductsList()
  }, [])



  useEffect(() => {
    getProductsList()
  }, [trigger])

  const getProductsList = () => {
    request.get('productview',)
      .then(function (response) {
        setProduct(response.data)
        setDataSource(response.data)
        console.log(response.data,'product');
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  const handleEditProduct = () => {
    getProductsList();
    handleCancel();
  }

  const onViewProduct = (record) => {
    setModalContent(<ModalViewContent record={record} />);
    setModalTitle("View Product");
    showModal();
  }

  const onEditProduct = (record) => {
    setModalContent(<AddProduct record={record} handleEditProduct={handleEditProduct} />);
    setModalTitle("Edit Product");
    showModal();
  }

  const columns = [

    {
      title: 'SI No',
      render: (_, a, index) => index + 1,
    },
    {
      title: 'Product ID',
      dataIndex: 'productid',
    },
    {
      title: 'Product Name',
      dataIndex: 'productname',
    },
    {
      title: 'Product Category',
      dataIndex: 'category',
    },
    {
      title: 'Product Tax',
      dataIndex: 'tax_percentage',
      render: (value) => {
        return (
          <span>{value}&nbsp;%</span>
        )
      }
    },
    {
      title: 'HSN code',
      dataIndex: 'hsn_code',
    },
    {
      title: 'Product Unit',
      dataIndex: 'unitname',
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <>
            <Flex center gap={'10px'}>
              <Button.Success text={<EyeOutlined />} onClick={() => onViewProduct(record)} />
              <Button.Primary text={<EditOutlined />} onClick={() => onEditProduct(record)} />  
            </Flex>
          </>
        );
      },
    }
  ]

  const ModalViewContent = ({ record, Name }) => {

    return (

      <Row gutter={[12, 12]}>
        <Col span={24} md={12}>
          <h2>Product Name&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.productname}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Product Category&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.category}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>HSN Code&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.hsn_code}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Product Unit&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.unitname}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Available Stock&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.stock}</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Tax Percentage&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.tax_percentage}&nbsp;%</h1>
        </Col>

        <Col span={24} md={12}>
          <h2>Product Description&nbsp;:</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.productdescription}</h1>
        </Col>
      </Row>
    )
  }

  return (
    <div>
      <TopTitle Heading={'Product View'} /><br />
      <Table columns={columns} data={dataSource} />
      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
    </div>

  )
}

export default ViewProductsDetails