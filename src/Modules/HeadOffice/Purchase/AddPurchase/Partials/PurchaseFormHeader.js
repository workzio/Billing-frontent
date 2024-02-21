import { Col, Form } from 'antd'
import React, { Fragment, useState } from 'react'
import { Row } from '../../../../../Components/Row'
import Input from '../../../../../Components/Form/Input'
import { Modal } from '../../../../../Components/Modal'
import { TextAreas } from "../../../../../Components/Form/TextArea"
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import { Select } from '../../../../../Components/Form/Select'
import Button from '../../../../../Components/Form/Button'
import Flex from '../../../../../Components/Flex'
import AddProduct from '../../../Product/AddProduct/Partials/AddProduct'
import { useDispatch, useSelector } from 'react-redux'
import { setCompany } from '../../../Company/actions'
import request from '../../../../../utils/request'
import { setProductCategory } from '../../../Product/action'
import { useEffect } from 'react'
import AddCompany from '../../../Company/AddCompany/Partials/AddCompany'


export const PurchaseFormHeader = ({ HandleUserChange, handleDateOnChange }) => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ============  Redux  ============

    const OutSourceRedux = useSelector((state) => state.Company.AddCompanies)

    const handleSalesOk = () => {
        setIsModalOpen(false);
        GetOutSourceCompany();
        GetProducts();
    }

    const dispatch = useDispatch();

    useEffect(() => {
        GetOutSourceCompany();
        GetProducts();
    }, [])

    const GetOutSourceCompany = () => {
        request.get('outsource')
            .then(function (response) {
                dispatch(setCompany(response.data))
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }

    const GetProducts = () => {
        request.get('category/product/unit')
            .then(function (response) {
                dispatch(setProductCategory(response.data))
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }


    // ============  Search Mobile ===========
    const searchMobile = OutSourceRedux.map(user => ({ label: user.companyname, value: user.companyname }));

    const handleSelectChange = (value) => {
        const selectedUser = OutSourceRedux.find(user => user.companyname === value);
        HandleUserChange(selectedUser)
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // ==========  Date Change =======
    const handleOnChange = (date) => {
        handleDateOnChange(date);
    };

    const handleAddCompany = () => {
        setModalTitle("Add OutSource Company");
        setModalContent(<AddCompany handleSalesOk={handleSalesOk} />);
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
                                options={searchMobile}
                                label={'Company'}
                                placeholder={'Company Name'}
                                name={'company_name'}
                                onChange={handleSelectChange}
                                rules={[
                                    {
                                        required: true,
                                        message: 'This is a required field'
                                    },

                                ]} />
                        </Col>
                        <Col sm={12} lg={8} span={24}>
                            <Input label={'Phone Number'}
                                placeholder={'Phone Name'}
                                name={'phone_number'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Phone Name!',
                                    },
                                ]}
                                disabled
                            />
                        </Col>

                    </Row>

                    <Row gutter={[12, 12]}>
                        <Col sm={12} lg={8} span={24}>
                            <TextAreas
                                label={'Address'}
                                name={'address'}
                                placeholder={'Address'}
                                rules={[{
                                    required: true,
                                    message: 'Please enter a Address',
                                },
                                ]} disabled />
                        </Col>

                        <Col sm={12} lg={8} span={24}>
                            <Flex W_100 H_100 center alignCenter column gap="20px">
                                <Button.Primary onClick={handleAddCompany} text={'Add Company'} />
                                <Button.Primary onClick={handleAddProduct} text={'Add Product'} />
                            </Flex>
                        </Col>

                        <Col sm={24}>
                            <Input
                                name={'companyid'}
                                style={{ display: 'none' }}
                            />
                        </Col>

                    </Row>

                </Col>

                <Col sm={8} lg={6} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Input
                                label={'Purchase Number'}
                                name={'purchaseNumber'}
                                placed={'end'}
                                disabled
                            />
                        </Col>

                        <Col span={24}>
                            <Input
                                label={'Invoice Number'}
                                name={'invoice_no'}
                                placed={'end'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'This is Required!',
                                    }
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <CustomDatePicker
                                label={'Purchase Date'}
                                name={'purchase_date'}
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
