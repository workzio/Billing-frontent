import { Col, Form } from 'antd'
import React, { useState } from 'react'
import { Row } from '../../../../../Components/Row';
import Input from '../../../../../Components/Form/Input';
import Button from '../../../../../Components/Form/Button';
import Flex from '../../../../../Components/Flex';
import { TextAreas } from '../../../../../Components/Form/TextArea';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber';

const AddDistributionForm = ({  data, handleSalesOk, handleGetTable }) => {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        if (data) {
            UpdateDistributor(values)
        }
        else {
            PostDistributor(values)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    const onReset = () => {
        form.resetFields();
        if (handleGetTable) {
            form.resetFields();
            handleGetTable();
        }
        if(handleSalesOk){
            form.resetFields();
            handleSalesOk();
        }
    };


    const PostDistributor = (values) => {

        request.post('save_Distribution', values)
            .then(function (response) {
                if (response.status == 200) {
                    toast.success('Successfully Added Distributor details')
                    form.resetFields();
                    if (handleSalesOk) {
                        form.resetFields();
                        handleSalesOk();
                    }
                    if (handleGetTable) {
                        form.resetFields();
                        handleGetTable();
                    }
                }
                else {
                    console.log('Distributes details failed');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //==========================edit=======================//

    const UpdateDistributor = (values) => {

        request.put(`edit/Distribution/${data.distributorid}`, values)
            .then(function (response) {
                handleGetTable();
                if (response.status == 200) {
                    toast.info('Successfully Updated Distributor details')
                    form.resetFields();
                }
                else {
                    console.log('Distributes details failed');
                }
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }

    useEffect(() => {
        form.setFieldsValue(data)
    }, [data])

    
    const ChangeValue = (obj) => {

        for (let key in obj) {
            if (obj[key] === 0) {
                obj[key] = ''
            }
        }
        return obj;
    }
    ChangeValue(data)

    //======================Phone Number==========================

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Row gutter={[24, 24]} >
                <Col span={24} md={12}>
                    <Input label={'Name'} placeholder={'Name'} name={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Your Name!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber precision={0} label={'Contact '} placeholder={'Phone Number '} name={'phoneno'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Phone Number!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'GSTIN / UIN'} style={{ textTransform: 'uppercase' }} placeholder={'GST In'} name={'gst_no'}
                    />
                </Col>
            
                <Col span={24} md={12}>
                    <Input label={'Email id'} type="email" name={'email'} placeholder={"Email ID"} />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber precision={0} label={'Code'} name={'code'} placeholder={"State code"}
                        rules={[
                            { required: true, message: 'Please enter State code ' },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <TextAreas label={'Address'} placeholder={'Address'} name={'address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input name={'district'} label={'District'} placeholder={'District'} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'State'} placeholder={'State'} name={'state'} />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber precision={0} label={'Pincode'} name={'pincode'} placeholder={'pincode'} />
                </Col>
                <Col span={24} md={12} offset={12}></Col><br />
            </Row>
            {data ? (
                <Flex center >
                    <Button.Primary htmlType={'submit'} text={'Update'} />&nbsp;&nbsp;
                    <Button.Danger onClick={() => onReset()} text={'Cancel'} />
                </Flex>

            ) : (
                <Flex center >
                    <Button.Primary htmlType={'submit'} text={'Submit'} />&nbsp;&nbsp;
                    <Button.Danger onClick={() => onReset()} text={'Cancel'} />
                </Flex>
            )
            }

        </Form>

    )
}
export default AddDistributionForm