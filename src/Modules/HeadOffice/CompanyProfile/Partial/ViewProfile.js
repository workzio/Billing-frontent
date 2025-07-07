import { Col, Form, Image } from 'antd'
import React, { useState } from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle';
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { TextAreas } from '../../../../Components/Form/TextArea';
import { FormTitle } from '../../../../Components/Form/FormTitle';
import { CustomCardView } from '../../../../Components/CustomCardView';
import { useEffect } from 'react';
import request from '../../../../utils/request';
import Flex from '../../../../Components/Flex';
import Button from '../../../../Components/Form/Button';
import { Modal } from '../../../../Components/Modal';
import CompanyProfile from './CompanyProfile';
import { useDispatch } from 'react-redux';
import { setCompanyProfile } from '../action';

export const ViewProfile = () => {


    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [companyPro, setCompanyPro] = useState({})
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ============  Sales  ====
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // localhost:8081/mycompany

    const onFinish = (values) => {
        onViewDetails(values)

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onViewDetails = (record) => {
        setModalContent(<CompanyProfile record={record} CancelModal={CancelModal} />);          //<ModalViewDatas record={record}/>
        setModalTitle("Edit Company");
        showModal();
    }

    const CancelModal = () => {
        handleCancel()
        GetCompany();
    }

    useEffect(() => {
        form.setFieldsValue(companyPro)
    }, [companyPro])

    const ChangeValue = (obj) => {

        for (let key in obj) {
            if (obj[key] === 0) {
                obj[key] = ''
            }
        }
        return obj;
    }
    ChangeValue(companyPro)

    useEffect(() => {
        GetCompany();
    }, [])


    const GetCompany = () => {

        request.get('Shop_mycompany/1')
            .then(function (response) {
                setCompanyPro(response.data)
                dispatch(setCompanyProfile(response.data))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <TopTitle Heading={'View Company Profile'} />
            <CustomCardView width={'1000px'}>
                {
                    companyPro != 0 ?
                        (
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off">

                                <Row gutter={[24, 24]} >
                                    <Col span={24} md={24}><FormTitle Title={'Company Details'} /></Col>
                                    <Col span={24} md={12}>
                                        <Input label={'Company Name'} placeholder={'Company Name'} name={'companyname'} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'GSTIN / UIN'} style={{ textTransform: 'uppercase' }} placeholder={'GST In'} name={'gstno'} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'Email id'} type="email" name={'email'} placeholder={"Email ID"} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'Code'} placeholder={'State Code'} name={'code'} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'Contact No - 1'} placeholder={'Phone Number - 1'} name={'phoneno1'} maxLength={10} disabled /><br />
                                        <Input label={'Contact No - 2'} placeholder={'Phone Number - 2 '} name={'phoneno2'}
                                            maxLength={10} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <TextAreas label={'Address'} placeholder={'address'} name={'address'} disabled />
                                    </Col>
                                    <Col span={24} md={12}>

                                        <Input label={'Country'} placeholder={'County'} name={'country'} disabled />
                                    </Col>
                                    <Col span={24} md={12}>

                                        <Input label={'State'} placeholder={'State'} name={'state'} disabled />

                                    </Col>
                                    <Col span={24} md={12}>

                                        <Input label={'District'} name={'district'} placeholder={"District"} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'Pincode'} name={'pincode'} placeholder={'pincode'}
                                            maxLength={6} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'Location'} name={'location'} placeholder={'Location'} disabled />
                                    </Col>

                                    <Col span={24} md={12} offset={12}></Col><br />
                                    <Col span={24} md={24}><FormTitle Title={'Bank Details'} /></Col>

                                    <Col span={24} md={12}>
                                        <Input label={'Bank Name'} placeholder={'Bank Name'} name={'bankname'} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'Account No'} placeholder={'Account number '} name={'account_no'} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'IFSC Code'} placeholder={'IFSC Code'} name={'ifsc_code'} disabled />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <Input label={'Branch'} placeholder={'Branch'} name={'branch'} disabled />
                                    </Col>

                                    <Flex center style={{ margin: '30px' }}>
                                        <Button.Primary htmlType={'submit'} text={'Update'} />
                                    </Flex>

                                </Row>
                            </Form>
                        ) : (
                            <h1>Loading .............</h1>
                        )
                }

            </CustomCardView>

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />

        </div>

    )
}
