import { Col, Form } from 'antd'
import React, { useState } from 'react'
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { TextAreas } from '../../../../Components/Form/TextArea';
import Flex from '../../../../Components/Flex';
import Button from '../../../../Components/Form/Button';
import { FormTitle } from '../../../../Components/Form/FormTitle';
import dayjs from 'dayjs';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CompanyProfile = ({ record, CancelModal }) => {


    const [form] = Form.useForm();
    const [selectedDate, setSelectedDate] = useState(null);


    const onFinish = (values) => {
        if (record) {
            UpdateCompany(values)
        }
        else {
            PostCompanyProfile(values);
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields();

        if (CancelModal) {
            form.resetFields();
            CancelModal();
        }
    };

    useEffect(() => {
        form.setFieldsValue(record)
    }, [record])


    const PostCompanyProfile = (values) => {

        request.post('save_mycompany', values)
            .then(function (response) {

                if (response.status == 200) {
                    toast.success('Successfully Added Company details')
                    form.resetFields();
                }
            })
            .catch(function (error) {
                toast.error('Failed ')
                console.log(error);
            });
    }


    const UpdateCompany = (values) => {
        request.put('edit/mycompany/1', values)
            .then(function (response) {
                form.resetFields();
                toast.info('Successfully Updated Company details')
                CancelModal();

            })
            .catch(function (error) {
                toast.error('Failed ')
                console.log(error);
            });
    }
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
                invoice_date: dayjs()
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <Row gutter={[24, 24]} >
                <Col span={24} md={24}><FormTitle Title={'Company Details'} /></Col>
                <Col span={24} md={12}>
                    <Input label={'Company Name'} placeholder={'Company Name'} name={'companyname'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'GSTIN / UIN'} style={{ textTransform: 'uppercase' }} placeholder={'GST In'} name={'gstno'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Email id'} type="email" name={'email'} placeholder={"Email ID"}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Code'} placeholder={'State Code'} name={'code'}
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
                    <Input label={'Contact No - 1'} placeholder={'Phone Number - 1'} name={'phoneno1'}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Phone Number!',
                            },
                        ]} /><br />
                    <Input label={'Contact No - 2'} placeholder={'Phone Number - 2 '} name={'phoneno2'}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }} />
                </Col>
                <Col span={24} md={12}>
                    <TextAreas label={'Address'} placeholder={'address'} name={'address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>

                    <Input label={'Country'} placeholder={'County'} name={'country'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },

                        ]}

                    />
                </Col>
                <Col span={24} md={12}>

                    <Input label={'State'} placeholder={'State'} name={'state'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />

                </Col>
                <Col span={24} md={12}>

                    <Input label={'District'} name={'district'} placeholder={"District"}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Pincode'} name={'pincode'} placeholder={'pincode'}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter pincode!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Location'} name={'location'} placeholder={'Location'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter location!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>

                </Col>

                <Col span={24} md={12} offset={12}></Col><br />
                <Col span={24} md={24}><FormTitle Title={'Bank Details'} /></Col>

                <Col span={24} md={12}>
                    <Input label={'Bank Name'} placeholder={'Bank Name'} name={'bankname'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Account No'} placeholder={'Account number '} name={'account_no'}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Account No!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'IFSC Code'} placeholder={'IFSC Code'} name={'ifsc_code'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Branch'} placeholder={'Branch'} name={'branch'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter details!',
                            },
                        ]} />
                </Col>

            </Row>
            <Flex center style={{ margin: '30px' }}>
                {
                    record ? (
                        <Button.Primary htmlType={'submit'} text={'Update'} />
                    ) : (
                        <Button.Primary htmlType={'submit'} text={'Submit'} />
                    )
                }
                &nbsp;&nbsp;<Button.Danger onClick={() => onReset()} text={'Cancel'} />
            </Flex>
        </Form>
    )
}

export default CompanyProfile