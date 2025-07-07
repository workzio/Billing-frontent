import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Col, Form } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { TopTitle } from '../../../../../Components/Form/TopTitle';
import { Modal } from '../../../../../Components/Modal';
import { Row } from '../../../../../Components/Row';
import { Table } from '../../../../../Components/Table';
import request from '../../../../../utils/request';
import Input from '../../../../../Components/Form/Input';
import { toast } from 'react-toastify';

const ViewCategory = ({ getCategory, handleTrigger }) => {

  const [dataSource, setDataSource] = useState([]);
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [form] = Form.useForm();


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <>
            <Flex center gap={'10px'}>
              <Button.Success text={<EyeOutlined />} onClick={() => {
                onViewCategory(record);
              }} />
              <Button.Primary text={<EditOutlined />} onClick={() => {
                onEditCategory(record);
              }} />
            </Flex>
          </>
        );
      },
    }
  ]


  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    request.get('category',)
      .then(function (response) {

        setDataSource(response.data)
      })

      .catch(function (error) {
        console.log(error);
      });
  }


  // ==========  Modals ============
  const onViewCategory = (record) => {
    setModalContent(<Categoryview record={record} />);
    setModalTitle("View Category");
    showModal();
  }

  const onEditCategory = (record) => {
    setModalContent(<CategoryEdit record={record} />);
    setModalTitle("Edit Category");
    showModal();
  }

  const Categoryview = ({ record }) => {
    return (
      <Row>
        <Col span={24} md={12}>
          <h2>Name Of the Category :</h2>
        </Col>
        <Col span={24} md={12}>
          <h1>{record.category}</h1>
        </Col>
      </Row>
    )
  }

  // ================ Edit Category  ===============
  const onFinish = (values) => {
    UpdateCategory(values);
    setIsModalOpen(false)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
    handleOk();
  };

  const UpdateCategory = (record) => {
    request.put(`category/edit/${record?.category_id}`, { category: record.category })
      .then(function (response) {
        toast.info('Category Updated Successfully')
        getCategoryList();
        handleTrigger();
      })

      .catch(function (error) {
        console.log(error);
      });
  }


  const CategoryEdit = ({ record }) => {

    useEffect(() => {
      form.setFieldsValue(record)
    }, [])

    return (
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        autoComplete='off' >
        <Row >
          <Col span={24}>
            <Input label={'Name of the Category'} placeholder={'Category Name'} name={'category'} rules={[
              {
                required: true,
                message: 'Please enter details!',
              },
            ]} />

            <Input name={'category_id'} display={'none'} />
          </Col>

          <div style={{ margin: '10px' }}>
            <Flex center gap={'20px'} W_100>
              <Button.Primary text={'Update'} htmlType={'submit'} />
              <Button.Danger text={'cancel'} onClick={() => onReset()} />
            </Flex>
          </div>
        </Row>
      </Form >
    )
  }

  return (
    <div>
      <TopTitle Heading={"View Category"} />
      <Table columns={columns} data={dataSource} />
      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}

export default ViewCategory