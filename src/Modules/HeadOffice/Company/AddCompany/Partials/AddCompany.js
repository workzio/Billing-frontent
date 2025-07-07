import { Col, Form } from 'antd';
import React, { useState } from 'react'
import { Row } from '../../../../../Components/Row';
import Input from '../../../../../Components/Form/Input';
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber';
import { TextAreas } from '../../../../../Components/Form/TextArea';
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const AddCompany = ({ handleSalesOk, companydata, handleviewtable }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        if (companydata) {
            EditCompanyOutSource(values, companydata.id)
        }
        else {
            Post_CompanyoutSource(values);

        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields();
        if (handleSalesOk) {
            form.resetFields();
            handleSalesOk();
        }
    };

    const Post_CompanyoutSource = (values) => {
        request.post('outsource/save', values)
            .then(function (response) {

                if (response.status == 200) {
                    toast.success('Successfully Added Company OutSource ')
                    form.resetFields();
                    if (handleSalesOk) {
                        form.resetFields();
                        handleSalesOk();
                    }
                }
                else {

                }
            })
            .catch(function (error) {
                toast.error("Failed")
                console.log(error);
            });
    }
    //====================edit==============================//
    useEffect(() => {
        form.setFieldsValue(companydata)
    }, [companydata])

    
    const ChangeValue = (obj) => {

        for (let key in obj) {
            if (obj[key] === 0) {
                obj[key] = ''
            }
        }
        return obj;
    }
   ChangeValue(companydata)

    const EditCompanyOutSource = (record) => {
        request.put(`outsource/edit/${companydata.companyid}`, record)
            .then(function (response) {
                handleviewtable();
                if (response.status == 200) {
                    toast.info('Successfully Updated Company OutSource details')
                    form.resetFields();
                }
            })
            .catch(function (error) {
                toast.error('Failed');
                console.log(error);
            });
    }
    //======================Phone Number==========================

    return (
        <Form
            form={form}
            name="addCompany"
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

                <Col span={24} md={12}>
                    <Input label={'Dealers Name'} placeholder={'Dealers Name'} name={'dealername'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter dealers name!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Company Name'} placeholder={'Company Name'} name={'companyname'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter company name!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <TextAreas label={'Address'} placeholder={'Door Details'} name={'address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter address!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>

                    <Input label={'Code '} placeholder={'State code'} name={'code'}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter code!',
                            },
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'GSTIN / UID'} style={{ textTransform: 'uppercase' }} placeholder={'GSTIN / UID'} name={'gstin'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter GSTIN!',
                            },
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Email id'} type="email" name={'email'} placeholder={"Email ID"} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber precision={0} label={'Contact '} placeholder={'Phone Number '} name={'contact'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Phone Number!',
                            },
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Tax'} name={'taxid'} placeholder={"Tax ID"} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Country'} on placeholder={'Select'} name={'country'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Account number'} name={'accountnumber'} placeholder={"Account number"}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'District'} name={'district'} placeholder={"District"} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'City'} name={'city'} placeholder={"City"} />
                </Col>

                <Col span={24} md={12}>

                    <Input label={'State'} placeholder={'State'} name={'state'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Post code'} name={'zipcode'} placeholder={"Post Code"}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }} />
                </Col>
            </Row>
            <Flex spaceEvenly style={{ margin: '20px' }}>
                {companydata ?
                    (
                        <div>
                            <Flex spaceEvenly style={{ margin: '20px' }}>
                                <Button.Primary htmlType="submit" text={'Update'} />&nbsp;&nbsp;
                                <Button.Danger text={'Cancel'} onClick={() => onReset()} />
                            </Flex>
                        </div>
                    )
                    : (
                        <div>
                            <Flex spaceEvenly style={{ margin: '20px' }}>
                                <Button.Primary htmlType="submit" text={'Save'} />&nbsp;&nbsp;
                                <Button.Danger text={'Cancel'} onClick={() => onReset()} />
                            </Flex>

                        </div>)
                }
            </Flex>
        </Form>

    )
}

export default AddCompany