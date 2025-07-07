import { Col, Form } from "antd";
import Flex from "../../../../../Components/Flex";
import { Row } from "../../../../../Components/Row";
import { useEffect, useState } from "react";
import Input from "../../../../../Components/Form/Input";
import { InputNumber } from "../../../../../Components/Form/InputNumber";
import Button from "../../../../../Components/Form/Button";
import { CustomDatePicker } from "../../../../../Components/Form/CustomDatePicker";
import { TopTitle } from "../../../../../Components/Form/TopTitle";
import dayjs from 'dayjs';
import { CustomInputNumber } from "../../../../../Components/Form/CustomInputNumber";
import { TextAreas } from "../../../../../Components/Form/TextArea";
import Checkbox from "../../../../../Components/Form/Checkbox";
import Label from "../../../../../Components/Form/Label";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { Select } from "../../../../../Components/Form/Select";

export const VoucherForm = ({ data, handleGetTable }) => {
    const [form] = Form.useForm();
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [voucherNumber, setVoucherNumber] = useState(null);

    const [voucherType, setVoucherType] = useState()
    const [distributors, setDistributors] = useState([])
    const [company, setCompany] = useState([])

    console.log(data, 'DATA');
    useEffect(() => {
        GetVoucherNumber();
        GetDistributors()
        GetCompanies()
    }, [])

    // useEffect(() => {
    //     form.setFieldsValue(data)
    // }, [data])

    const GetDistributors = () => {
        request.get('Distribution')
            .then(response => {
                setDistributors(response.data)
            })
            .catch(error => console.log(error, 'error'))
    }


    const GetCompanies = () => {
        request.get('outsource')
            .then(response => {
                setCompany(response.data)
            })
            .catch(error => console.log(error, 'error'))
    }

    const GetVoucherNumber = () => {
        request.get('vouchers/last')
            .then(function (response) {
                setVoucherNumber(response.data.voucherno)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        if (data) {
            form.setFieldsValue({ voucherNo: data?.voucherNo })
        }
        else {
            form.setFieldsValue({ voucherNo: `${voucherNumber}` })
        }
    }, [voucherNumber])

    useEffect(() => {

        setVoucherType(data?.voucherType)
        form.setFieldsValue({
            voucherNo: data?.voucherNo,
            date: data?.date,
            paidTo: data?.paidTo,
            voucherType: data?.voucherType,
            towards: data?.towards,
            paymentType: data?.paymentType,
            bank: data?.bank,
            amount: data?.amount,
            chequeNo: data?.chequeNo,
        })

        if (data?.voucherType === 'distributor') {
            form.setFieldsValue({ distributor: data?.towards, distributorid: data?.distributorid })
        }

        else if (data?.voucherType === 'outsourceCompany') {
            form.setFieldsValue({ company: data?.towards, companyid: data?.companyid })
        }

    }, [data])

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const onFinish = (values) => {
        const NewValue = { ...values, date: selectedDate }
        if (data) {
            UpdateVoucher(NewValue)
        }
        else {
            VoucherPost(NewValue);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const VoucherPost = (values) => {
        console.log(values, 'values to be posted');
        request.post('vouchers/save', values)
            .then(function (response) {
                console.log(response.data, 'response');
                if (response.status == 200) {
                    toast.success('Successfully Saved ')
                    form.resetFields();
                    GetVoucherNumber();
                }
                else {

                    console.log('Something went Wrong');
                }
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }

    const onReset = () => {
        form.resetFields();
        form.setFieldsValue({ voucherNo: `${voucherNumber}` })
        if (handleGetTable) {
            form.resetFields();
            handleGetTable();
        }
    };


    //==========================edit=======================//
    const UpdateVoucher = (values) => {

        request.put(`vouchers/edit/${data.voucher_id}`, values)
            .then(function (response) {
                handleGetTable();
                if (response.status == 200) {
                    toast.info('Successfully Updated Voucher details')
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



    const voucherOptions = [
        {
            label: 'Customer',
            value: 'customer',
        },
        {
            label: 'Distributor',
            value: 'distributor',
        },
        {
            label: 'Outsource Company',
            value: 'outsourceCompany',
        },
    ]

    const handleVoucherType = (e) => {
        setVoucherType(e)
        if (voucherType === 'distributor') {
            form.resetFields(['distributor'])
            form.resetFields(['distributorid'])

        } else if (voucherType === 'outsourceCompany') {
            form.resetFields(['company'])
            form.resetFields(['companyid'])
        }
        form.resetFields(['towards'])
    }


    const handleDistributor = (e) => {
        const selectedDist = distributors.find((dist) => dist.name === e)
        form.setFieldsValue({ distributorid: selectedDist.distributorid })
        form.setFieldsValue({ towards: e })
    }


    const distOptions = distributors.map(val => ({
        label: val.name,
        value: val.name
    }))

    const handleCompany = (e) => {
        const selectedDist = company.find((dist) => dist.companyname === e)
        form.setFieldsValue({ companyid: selectedDist.companyid })
        form.setFieldsValue({ towards: e })
    }

    const companyOptions = company.map(val => ({
        label: val.companyname,
        value: val.companyname
    }))


    return (
        <Form
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
                    returnType: false,
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row gutter={[24, 24]}>

                <Col span={24} md={12}>
                    <Input label={'Voucher No'} name={'voucherNo'} disabled />
                </Col>

                <Col span={24} md={12}>
                    {
                        data ? (
                            <Input label={'Date'} disabled name={'date'} />
                        ) : (
                            <CustomDatePicker label={'Date'} name={'date'} onChange={handleOnChange} rules={[
                                {
                                    required: true,
                                    message: 'Please Enter The date!',
                                }
                            ]} />
                        )
                    }
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Paid to'} name={'paidTo'} placeholder={"Name"} rules={[
                        {
                            required: true,
                            message: "Please Enter the person's name you paid to!",
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <Select
                        options={voucherOptions}
                        label={'Voucher Type'}
                        placeholder={'Select type'}
                        name={'voucherType'}
                        onChange={handleVoucherType}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Receipt Type',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    {voucherType === 'customer' ?
                        <Input label={'Towards'} placeholder={'towards'} name={'towards'} rules={[
                            {
                                required: true,
                                message: 'Please Enter details',
                            }
                        ]} /> :
                        <Input label={'Towards'} disabled name={'towards'} rules={[
                            {
                                required: true,
                                message: 'Please Enter details',
                            }
                        ]} />
                    }
                </Col>

                <Col span={24} md={12}>

                    {voucherType === 'distributor' && (
                        <>
                            <Select
                                options={distOptions}
                                label={'Distributor'}
                                name={'distributor'}
                                placeholder={'Select distributor'}
                                onChange={handleDistributor}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Select distributor',
                                    }
                                ]}
                            />
                            <Input name={'distributorid'} display={'none'} />
                        </>
                    )}

                    {voucherType === 'outsourceCompany' && (
                        <>
                            <Select
                                options={companyOptions}
                                label={'Company'}
                                placeholder={'Select company'}
                                name={'company'}
                                onChange={handleCompany}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Select company',
                                    }
                                ]}
                            />
                            <Input name={'companyid'} display={'none'} />
                        </>

                    )}

                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Amount'} min={1.0} precision={2} name={'amount'} placeholder={'Amount'} rules={[
                        {
                            required: true,
                            message: 'Please Enter the amount !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <TextAreas label={'Particulars'} name={'particulars'} placeholder={"Write the particulars"} />
                </Col>

                <Col span={24} md={12}>
                    <Flex center H_100 column spaceEvenly>
                        <Label>Return Type</Label>
                        <Checkbox name={'returnType'} label={'Amount Return'} />
                    </Flex>
                </Col>

            </Row>
            <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
                <Button.Success text={'SUBMIT'} htmlType={'submit'} />
                <Button.Danger text={'CANCEL'} onClick={() => onReset()} />
            </Flex>
        </Form>
    )
}