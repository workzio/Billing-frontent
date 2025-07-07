import React, { useEffect, useState } from 'react'
import { Col, Form, Popconfirm } from 'antd';
import Flex from '../../../../../Components/Flex';
import { Row } from '../../../../../Components/Row';
import Input from '../../../../../Components/Form/Input';
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker';
import { useForm } from 'antd/es/form/Form';
import Button from '../../../../../Components/Form/Button';
import dayjs from 'dayjs';
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber';
import request from '../../../../../utils/request';
import { Select } from '../../../../../Components/Form/Select';
import { toast } from 'react-toastify';

export const DebitReturnModal = ({getSalesList, CallAllResetFunction, trigger, handleCancel, record, setIsModalOpen, dataFromAmtTable, amountData, handleDebitReturnModal }) => {

    useEffect(() => {
        if (record) {
            form.resetFields()
            form.setFieldsValue(record)
            form.setFieldsValue({ invoice_date: dayjs(record?.invoice_date).format('YYYY-MM-DD') }, { currentReceived: null })
        }
    }, [record])

    useEffect(() => {
        if (dataFromAmtTable) {
            form.setFieldsValue(dataFromAmtTable)
            form.setFieldsValue({ invoice_date: dayjs(amountData.payment_date).format('YYYY-MM-DD') })
            form.setFieldsValue({ currentReceived: amountData.amount })
        }
    }, [dataFromAmtTable])


    useEffect(() => {
        if (!dataFromAmtTable) {
            form.resetFields(['currentReceived', 'paymentDate', 'returnPaymentType'])
        }
    }, [trigger])


    const paymentTypes = [
        {
            label: 'Cash',
            value: 'Cash'
        },
        {
            label: 'Cheque',
            value: 'Cheque'
        },
        {
            label: 'Online Transaction',
            value: 'Online Transaction'
        },
    ]

    const [form] = useForm();

    const [selectedDate, setSelectedDate] = useState();


    const handleDateChange = (dateValue) => {
        setSelectedDate(dateValue)
    }

    const handleChange = (val) => {
        if (val > record?.balance) {
            form.setFieldsValue({ currentReceived: record?.balance })
        }
    }


    const onFinish = (values) => {
        const NewValue = { ...values, paymentDate: selectedDate }
      
        if (dataFromAmtTable) {
            EditAmount(NewValue)
        } else {
            postData(NewValue)
            handleCancel()
        }

    }

    const EditAmount = (value) => {
        request.put(`/total/sales/edit/${amountData?.paymentId}`, value)
            .then(response => {
                handleDebitReturnModal()
                getSalesList()
            })
            .catch(error => console.log(error, 'errorrr'))
    }

    const postData = (NewValue) => {
        request.post('total/sales/save', NewValue)
            .then(response => {
                toast.success('Amount Received Successfully')
                CallAllResetFunction()
            })
            .catch(error => console.log('ERROR ', error))
    }

    const onFinishFailed = (failed) => {
        console.log(failed, 'FORM FINISH FAILED');
    }

    const onReset = () => {
        if (setIsModalOpen) {
            setIsModalOpen(false)
        }
    }

    const confirmSubmit = () => {
        form.submit();
    };

    const cancelSubmit = () => {
        console.log('cancelled');
    }


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
            initialValues={
                {
                    date: dayjs(),
                }
            }
            autoComplete='off'
        >
            <Row gutter={[24, 24]}>
                <Col span={24} md={12}>
                    <Input label={'Invoice Number'} name={'invoice_no'} disabled />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Date'} name={'invoice_date'} disabled />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Grand Total'} name={'total_amount'} disabled />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Received Amount'} name={'received'} disabled />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Balance Amount'} name={'balance'} disabled />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber onChange={handleChange} label={'Paying Amount'} min={1.0} precision={2} placeholder={'Paying Amount'} name={'currentReceived'} rules={[
                        {
                            required: true,
                            message: 'Please enter amount!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomDatePicker label={'Date'} name={'paymentDate'} onChange={handleDateChange} rules={[
                        {
                            required: true,
                            message: 'Please select date!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <Select label={'Payment Type'} options={paymentTypes} rules={[
                        {
                            required: true,
                            message: 'Please select payment type!'
                        },

                    ]}
                        placeholder={'Payment Type'}
                        name={'returnPaymentType'}
                    />
                </Col>

                <Col span={24} md={12} style={{ display: 'none' }}>
                    <Input name={'distributorid'} value={record?.distributorid} />
                    <Input name={'sales_id'} value={record?.sales_id} />
                </Col>

                <Flex center gap={'20px'} W_100>
                    {(dataFromAmtTable) ?
                        <>
                            <Popconfirm
                                title="This is your last edit, After that you can't edit anymore!"
                                onConfirm={confirmSubmit}
                                onCancel={cancelSubmit}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button.Success text={'Submit'} />
                            </Popconfirm>
                        </>
                        :
                        <Button.Success text={'Submit'} htmlType={'submit'} />
                    }
                    <Button.Danger text={'Cancel'} onClick={() => onReset()} />
                </Flex>
            </Row>
        </Form>
    )
}
