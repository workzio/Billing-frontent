import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Col, Form } from 'antd';
import React from 'react'
import { useState } from 'react';
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { TopTitle } from '../../../../../Components/Form/TopTitle';
import { Modal } from '../../../../../Components/Modal';
import { Row } from '../../../../../Components/Row';
import { Table } from '../../../../../Components/Table';
import Input from '../../../../../Components/Form/Input';
import request from '../../../../../utils/request';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ViewUnits = ({ handleTrigger }) => {


    const [dataSource, setDataSource] = useState([]);
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const [form] = Form.useForm();


    useEffect(() => {
        getUnitList()
    }, [])


    const getUnitList = () => {
        request.get('unit',)
            .then(function (response) {
                setDataSource(response.data)
            })

            .catch(function (error) {
                console.log(error);
            });
    }


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const UnitsColn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Unit',
            dataIndex: 'unitname',
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center gap={'10px'}>
                        <Button.Success text={<EyeOutlined />} onClick={() => {
                            onUnitsView(record);
                        }} />

                        <Button.Primary text={<EditOutlined />} onClick={() => {
                            onUnitsEdit(record);
                        }} />

                    </Flex>
                );
            },
        }
    ]

    // ===========  Modals =============
    const onUnitsView = (record) => {
        setModalContent(<UnitsView record={record} />);
        setModalTitle("View Unit");
        showModal();
    }

    const onUnitsEdit = (record) => {
        setModalContent(<UnitsEdit record={record} />);
        setModalTitle("Edit Unit");
        showModal();
    }

    const UnitsView = ({ record }) => {
        return (
            <Row>
                <Col span={24} md={12}>
                    <h2>Name Of the Unit :</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.unitname}</h1>
                </Col>
            </Row>
        )
    }

    // ================ Edit UNIT  ===============
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

        request.put(`unit/edit/${record?.unit_id}`, { unitname: record.unitname })
            .then(function (response) {
                toast.info('Unit Updated Successfully')
                getUnitList();
                handleTrigger();
            })

            .catch(function (error) {
                console.log(error);
            });
    }


    const UnitsEdit = ({ record }) => {

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
                <Row>
                    <Col span={24}>
                        <Input label={'Name of the Unit'} placeholder={'Unit Name'} name={'unitname'} rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />
                        <Input name={'unit_id'} display={'none'} />

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
            <TopTitle Heading={"View Unit"} />
            <Table columns={UnitsColn} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}

export default ViewUnits


