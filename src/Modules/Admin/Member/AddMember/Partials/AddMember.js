import React, { useEffect, useState } from 'react'
import { Mainsection } from '../../Style';
import { Col, Form } from 'antd';
import { Row } from '../../../../../Components/Row';
import Input from '../../../../../Components/Form/Input';
import Label from '../../../../../Components/Form/Label';
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker';
import { TextAreas } from '../../../../../Components/Form/TextArea';
import Flex from '../../../../../Components/Flex';
import Radio from '../../../../../Components/Form/RadioButton';
import { Select } from '../../../../../Components/Form/Select';
import Button from '../../../../../Components/Form/Button';
import { Modal } from '../../../../../Components/Modal';

const AdminAddMember = ({ getProduct }) => {
    const [form] = Form.useForm();
    const [value, setValue] = useState(1);

    const [selectedDate, setSelectedDate] = useState(null);
    const [productdata, setProductdata] = useState(                        // {setProduct}
        {
            mySelectField: '',
            myArraryField: [],
        },
    );



    useEffect(() => {
        setProductdata(getProduct)
    }, [getProduct])


    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };
    const onFinish = (values, e) => {
        console.log('Success:', values);

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onReset = () => {
        form.resetFields();
    }
    const RadioData = [
        {
            label: 'Male',
            value: 'male',
        },
        {
            label: 'Female',
            value: 'female',
        },
        {
            label: 'Trans',
            value: 'trans',
        },
    ]
    const Status = [
        {
            label: 'Single',
            value: 'single',
        },
        {
            label: 'Married',
            value: 'married',
        },
    ]
    return (
        <div style={{ margin: '0 auto', width: '95%' }}>
            <Mainsection>
                <Form name="sales"
                    form={form}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                        member_id: 'IO089#',
                    }}

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">

                    <Row gutter={[24, 24]} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                        <Col span={24} md={12}>
                            <Input label={'Name'} placeholder={'Name'} name={'name'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'Aadhar'} placeholder={'Aadhar'} name={'aadhar'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <Label>D.O.B :</Label>
                            <CustomDatePicker
                                name={'selected_date'}
                                onChange={handleOnChange}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please D.O.B!',
                                    }
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'Pan Id'} placeholder={'PanId'} name={'panid'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <Row gutter={[12, 12]}>
                                <Col span={24} md={12}>
                                    <Input label={'Phn.no'} placeholder={'Number'} name={'phnnumber'}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} />
                                </Col>
                                <Col span={24} md={12}>
                                    <Input label={'Alternate Phn.no'} placeholder={'Alternate Phn.no'} name={'alternatphnno'}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'PinCode'} placeholder={'pin code'} name={'pincode'}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'Email id'} name={'partymember_email'} placeholder={"Email ID"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <TextAreas label={'Address'} placeholder={'Door Details'} name={'address'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12} offset={12}></Col>
                        <Col span={24} md={12}>
                            <Input label={'Password'} type="password" name={'password'} placeholder={"Password"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter password!',
                                    },
                                ]} />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'Confirm Password'} type="password" name={'Cnfpassword'} placeholder={"Confirm pwd"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Confirm password!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <Label>Gender :</Label>
                            <div>
                                <Flex><Radio label={'Gender'} name={'gender'} value={value} onChange={onChange} data={RadioData} /></Flex>
                            </div>
                        </Col>

                        <Col span={24} md={12}>
                            <Label>Marital Status :</Label>
                            <Select options={Status} on placeholder={'Marital Status'} name={'mriedstatus'} />
                        </Col>
                        <Col span={24} md={12} offset={12}></Col><br />
                        <Flex spaceEvenly center gap>
                            <Button.Primary htmlType={'submit'} text={'Save Details'} />&nbsp;&nbsp;
                            <Button.Danger htmlType={'cancel'} text={'Cancel'} onClick={() => onReset()} />
                        </Flex>
                    </Row>
                </Form>
            </Mainsection>
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={400} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}

export default AdminAddMember