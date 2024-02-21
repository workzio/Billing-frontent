import { Col, Form } from 'antd'
import React, { useState } from 'react'
import { Mainsection } from '../../Style'
import { Outlet, useNavigate } from 'react-router-dom'
import Input from '../../../../../Components/Form/Input'
import { Row } from '../../../../../Components/Row'
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import { TextAreas } from '../../../../../Components/Form/TextArea'
import Radio from '../../../../../Components/Form/RadioButton'
import Flex from '../../../../../Components/Flex'
import { CustomSelect } from '../../../../../Components/Form/CustomSelect'
import { Select } from '../../../../../Components/Form/Select'
import Button from '../../../../../Components/Form/Button'
import { Modal } from '../../../../../Components/Modal'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import Label from '../../../../../Components/Form/Label'

const RegisterForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [value, setValue] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (e) => {
        setValue(e.target.value);
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
    const handleButtonClick = () => {
        setModalTitle("Add Desigination");
        setModalContent(<Modalcont handleOk={handleOk} />);
        showModal();
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
    const Items = [
        {
            label: 'Marketing',
            value: 'marketing',
        },
        {
            label: 'Distribution',
            value: 'distribution',
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
    const Modalcont = () => {
        return (
            <>
                <Form>
                    <Input placeholder={'Designation'} />
                    <Flex gap spaceAround><br /><br />
                        <Button.Primary text={'Save'}></Button.Primary>
                        <Button.Danger text={'Cancel'}></Button.Danger>
                    </Flex>
                </Form>
            </>
        )
    }

    return (
        <div style={{ margin: '0 auto', width: '95%' }}>
            <TopTitle Heading={'Registration Form'} /> <br />
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
                            <Input label={'Member ID'} placeholder={'Member ID'} name={'member_id'} disabled />
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
                            <Input label={'Phn.no'} placeholder={'Number'} name={'phnnumber'}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
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
                        <Col span={24} md={12}>
                            <Input label={'Email id'} name={'partymember_email'} placeholder={"Email ID"}
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
                            <Label>Designation :</Label><br />
                            <CustomSelect options={Items} name={'designation'} placeholder={'Designation'} onButtonClick={handleButtonClick} buttonLabel={'Add Designation'} />
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
            <Outlet />
        </div>
    )
}

export default RegisterForm