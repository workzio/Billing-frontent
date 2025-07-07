import { Col, Form } from 'antd'
import React, { Fragment, useState } from 'react'
import { Row } from '../../../../../Components/Row'
import { CustomSelect } from '../../../../../Components/Form/CustomSelect'
import Input from '../../../../../Components/Form/Input'
import { TextAreas } from "../../../../../Components/Form/TextArea"
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber'
import { Modal } from '../../../../../Components/Modal'
import Label from '../../../../../Components/Form/Label'


export const PurchaseFormHeader = ({ setPurchsaeOrder }) => {

    const [form] = Form.useForm();
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ======  Selected Date ========
    const [selectedDate, setSelectedDate] = useState(null);



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
        setSelectedDate(date);
    };

    const CusData = [
        {
            label: 'rejin',
            value: 'rejin'
        },
        {
            label: 'gladine',
            value: 'gladine'
        },
        {
            label: 'saras',
            value: 'saras'
        },
        {
            label: 'ishwarya',
            value: 'ishwarya'
        },

    ]
    const onFinish = (values) => {
        const record = { ...values, selected_date: selectedDate };
        setPurchsaeOrder(record)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const AddCustomerModal = () => {

        return (
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off" >
                <Row gutter={[12, 12]}>
                    <Col sm={12} lg={6} span={24}>
                        <CustomSelect label={'Customer'} options={CusData} rules={[
                            {
                                required: true,
                                message: 'This is a required field'
                            },

                        ]}
                            placeholder={'Customer'}
                            name={'sale_customer'} />
                    </Col>

                   

                </Row>
            </Form>
        )
    }

    const handleButtonClick = () => {
        setModalTitle("Add Party Group");
        setModalContent(<AddCustomerModal />);
        showModal();
    };
    return (
        <Fragment>
            <Row gutter={[12, 12]} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                <Col sm={16} lg={18} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col sm={12} lg={7} span={24}>
                            <Label>Company Name</Label>
                            <CustomSelect
                                style={{ marginTop: '13px' }}
                                options={CusData}
                                rules={[
                                    {
                                        required: true,
                                        message: 'This is a required field'
                                    },

                                ]}
                                name={'sale_customer'}
                                buttonLabel="Add Party"
                                onButtonClick={handleButtonClick}
                                placeholder={'Customer'}
                            />
                        </Col>
                        <Col sm={12} lg={7} span={24}>
                            <Input
                                label={'Bill Number'}
                                name={'billing_name'}
                                placeholder={'Bill Number'}
                            />
                        </Col>
                        <Col sm={12} lg={7} span={24}>
                            <CustomInputNumber
                                label={'Phone Number'}
                                name={'phone_number'}
                                precision={0}
                                placeholder={'Phone Number'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Phone Number!',
                                    },


                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[12, 12]}>
                        <Col sm={12} lg={7} span={24}>
                            <TextAreas
                                label={'Address'}
                                name={'billing_address'}
                                placeholder={'Address'}
                                rules={[{
                                    required: true,
                                    message: 'Please enter a billing Address',
                                },
                                {
                                    min: 10,
                                    message: 'Mininum 10 Characters need'
                                }
                                ]} />
                        </Col>
                    </Row>

                </Col>

                <Col sm={8} lg={6} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Input
                                label={'Purchase Number'}
                                name={'invoice_number'}
                                placed={'end'}
                                disabled
                            />
                        </Col>
                        <Col span={24}>
                            <CustomDatePicker
                                label={'Purchase Date'}
                                name={'invoice_date'}
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

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
