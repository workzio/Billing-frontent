import { Col,  } from 'antd'
import React, { Fragment, useState } from 'react'
import { Row } from '../../../../../Components/Row'
import Input from '../../../../../Components/Form/Input'
import { Modal } from '../../../../../Components/Modal'
import { TextAreas } from "../../../../../Components/Form/TextArea"
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import { Select } from '../../../../../Components/Form/Select'
import Button from '../../../../../Components/Form/Button'
import Flex from '../../../../../Components/Flex'
import AddDistributionForm from '../../../Distribution/AddDistribution/Partials/AddDistribution'
import AddProduct from '../../../Product/AddProduct/Partials/AddProduct'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import request from '../../../../../utils/request'
import { setDistribute } from '../../../Distribution/actions'
import { setProductCategory } from '../../../Product/action'

export const SalesFormHeader = ({ HandleUserChange, handleDateOnChange,triggerProduct }) => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);


    // ============  Redux  ============

    const DistributorRedux = useSelector((state) => state.Distributee.Distributor)


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSalesOk = () => {
        setIsModalOpen(false);
        GetDistributor();
        GetProducts();
    }

    const dispatch = useDispatch();

    useEffect(() => {
        GetDistributor();
        GetProducts();
    }, [])

    const GetDistributor = () => {
        request.get('Distribution')
            .then(function (response) {
                dispatch(setDistribute(response.data))
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }

    useEffect(() => {
        GetProducts();
    }, [triggerProduct])
    

    const GetProducts = () => {
        request.get('category/product/unit')
            .then(function (response) {
                dispatch(setProductCategory(response.data))
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }
    // ==========  Date Change =======
    const handleOnChange = (date) => {
        handleDateOnChange(date);
    };

    const searchDistributor = DistributorRedux.map(user => ({ label: user.name, value: user.name }));

    const handleSelectChange = (value) => {
        const selectedUser = DistributorRedux.find(user => user.name === value);
        HandleUserChange(selectedUser)
    };

    const handleAddDistributor = () => {
        setModalTitle("Add Distributor");
        setModalContent(<AddDistributionForm handleSalesOk={handleSalesOk} />);
        showModal();
    };

    const handleAddProduct = () => {
        setModalTitle("Add Product");
        setModalContent(<AddProduct handleSalesOk={handleSalesOk} />);
        showModal();
    }

    return (
        <Fragment>
            <Row gutter={[12, 12]}>
                <Col sm={16} lg={18} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col sm={12} lg={8} span={24}>

                            <Select
                                showSearch
                                options={searchDistributor}
                                label={'Customer Name'}
                                placeholder={'Customer Name'}
                                name={'name'}
                                onChange={handleSelectChange}
                                rules={[
                                    {
                                        required: true,
                                        message: 'This is a required field'
                                    },

                                ]} />

                        </Col>
                        <Col sm={12} lg={8} span={24}>
                            <Input
                                label={'Phone Number'}
                                placeholder={'Phone Number'}
                                name={'phone_number'}
                                disabled
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Customer Name!',
                                    },


                                ]}
                            />
                        </Col>

                    </Row>

                    <Row gutter={[12, 12]}>
                        <Col sm={12} lg={8} span={24}>
                            <TextAreas
                                label={'Shipping Address'}
                                name={'shipping_address'}
                                placeholder={'Shipping Address'}
                                rules={[{
                                    required: true,
                                    message: 'Please enter a shipping Address',
                                },
                                ]} disabled />
                        </Col>

                        <Col sm={12} lg={8} span={24}>
                            <Flex W_100 H_100 center alignCenter column gap="20px">
                                <Button.Primary onClick={handleAddDistributor} text={'Add Distributor'} />
                                <Button.Primary onClick={handleAddProduct} text={'Add Product'} />
                            </Flex>
                        </Col>

                        <Col sm={24}>
                            <Input
                                name={'distributorid'}
                                style={{ display: 'none' }}
                            />
                        </Col>

                    </Row>

                </Col>

                <Col sm={8} lg={6} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Input
                                label={'Invoice Number'}
                                name={'invoice_no'}
                                placed={'end'}
                                disabled
                            />
                        </Col>
                        <Col span={24}>
                            <CustomDatePicker
                                label={'Invoice Date'}
                                name={'selected_date'}
                                onChange={handleOnChange}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Date!',
                                    }
                                ]} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
