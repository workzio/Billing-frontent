import { Col, Form, DatePicker } from "antd";
import { CustomDatePicker } from "../../../../../Components/Form/CustomDatePicker";
import Input from "../../../../../Components/Form/Input";
import Flex from "../../../../../Components/Flex";
import Button from "../../../../../Components/Form/Button";
import { Row } from "../../../../../Components/Row";
import { useState } from "react";
import Radio from "../../../../../Components/Form/RadioButton";
import dayjs from 'dayjs';
import { CustomInputNumber } from "../../../../../Components/Form/CustomInputNumber";
import request from "../../../../../utils/request";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Select } from "../../../../../Components/Form/Select";

export const ReceiptForm = ({ data, handleGetTable, trigger }) => {

    // console.log(data, 'DATAA');

    const [form] = Form.useForm();
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [value, setValue] = useState(null);
    const [receiptNumber, setReceiptNumber] = useState(null);
    const [receiptType, setreceiptType] = useState('')
    const [distributors, setDistributors] = useState([])
    const [distributorId, setDistributorId] = useState()
    const [companies, setCompanies] = useState([])
    const [companyId, setCompanyId] = useState()

    useEffect(() => {
        GetReceiptNumber();
        GetDistributors();
        GetCompanies();
    }, [])

    useEffect(() => {

        if (data) {
            form.setFieldsValue({ receiptNo: data?.receiptNo })
        }
        else {
            form.setFieldsValue({ receiptNo: `${receiptNumber}` })
        }

    }, [receiptNumber])


    // useEffect(() => {
    //     form.setFieldsValue({ distributorid: distributorId })
    // }, [distributorId])

    // useEffect(() => {
    //     form.setFieldsValue({ companyid: companyId })
    // }, [companyId])

    useEffect(() => {

        setreceiptType(data?.receiptType)
        form.setFieldsValue({
            receiptNo:data?.receiptNo,
            date: data?.date,
            received: data?.received,
            receiptType: data?.receiptType,
            towards: data?.towards,
            paymentType: data?.paymentType,
            bank: data?.bank,
            amount: data?.amount,
            chequeNo: data?.chequeNo,
        })

        if (data?.receiptType === 'distributor') {
            form.setFieldsValue({ distributor: data?.towards, distributorid: data?.distributorid })
        }

        else if (data?.receiptType === 'outsourceCompany') {
            form.setFieldsValue({ company: data?.towards, companyid: data?.companyid })
        }

    }, [data])

    useEffect(() => {
        if (data?.paymentType === 'cash') {
            setValue('cash')
        }
    }, [data])

    useEffect(() => {
        if (value === 'cash') {
            form.setFieldsValue({ chequeNo: null })
        }
    }, [value])


    const GetReceiptNumber = () => {
        request.get('receipts/last')
            .then(function (response) {
                setReceiptNumber(response.data.receiptno)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                setCompanies(response.data)
            })
            .catch(error => console.log(error, 'error'))
    }


    const handleOnChange = (date) => {
        setSelectedDate(date);
    };
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onFinish = (values) => {
        const NewValue = { ...values, date: selectedDate }
        if (data) {
            UpdateReceipt(NewValue)
        }
        else {
            ReceiptPost(NewValue);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const ReceiptPost = (values) => {
        request.post('receipts/save', values)
            .then(function (response) {

                if (response.status == 200) {
                    toast.success('Successfully Saved ')
                    form.resetFields();
                    GetReceiptNumber();
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
        form.setFieldsValue({ receiptNo: `${receiptNumber}` })
        if (handleGetTable) {
            form.resetFields();
            handleGetTable();
        }
        setCompanyId(null)
        setDistributorId(null)
    };

    const RadioData = [
        {
            label: 'Cash',
            value: 'cash',
        },
        {
            label: 'Cheque',
            value: 'cheque',
        },
        {
            label: 'DD',
            value: 'dd',
        },
    ]

    const receiptOptions = [
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

    const handleRecepitType = (e) => {
        setreceiptType(e)
        if (receiptType === 'distributor') {
            form.resetFields(['distributor'])
            form.resetFields(['distributorid'])

        } else if (receiptType === 'outsourceCompany') {
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
        const selectedDist = companies.find((dist) => dist.companyname === e)
        form.setFieldsValue({ companyid: selectedDist.companyid })
        form.setFieldsValue({ towards: e })
    }

    const companyOptions = companies.map(val => ({
        label: val.companyname,
        value: val.companyname
    }))

    //==========================edit=======================//
    const UpdateReceipt = (values) => {
        request.put(`receipts/edit/${data.receipt_id}`, values)
            .then(function (response) {
                handleGetTable();
                if (response.status == 200) {

                    toast.info('Successfully Updated Receipt details')
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
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row gutter={[24, 24]}>
                <Col span={24} md={12}>
                    <Input label={'Receipt No'} name={'receiptNo'} disabled />
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
                    <Input label={'Received with thanks from '} name={'received'} placeholder={"Received from"} rules={[
                        {
                            required: true,
                            message: "Please Enter the person's name amount received from!",
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <Select
                        options={receiptOptions}
                        label={'Receipt Type'}
                        placeholder={'Select type'}
                        name={'receiptType'}
                        onChange={handleRecepitType}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Receipt Type',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    {receiptType === 'customer' ?
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

                    {receiptType === 'distributor' && (
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

                    {receiptType === 'outsourceCompany' && (
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
                    <p>Payment Type :</p>
                    <div>
                        <Flex>
                            <Radio label={'Cash via'} name={'paymentType'} value={value} onChange={onChange} options={RadioData} rules={[
                                {
                                    required: true,
                                    message: 'Please Enter the Payment Type !',
                                }
                            ]} />
                        </Flex>
                    </div>
                </Col>
                {
                    data ? (
                        <Col span={24} md={12}>

                            {(value === 'cash') ?
                                <Input label={'Cheque/DD no'} name={'chequeNo'} disabled={true} />
                                :
                                <Input label={'Cheque/DD no'} name={'chequeNo'} placeholder={"Enter Cheque or DD number"} rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Cheque/DD number!'
                                    }
                                ]} />

                            }
                        </Col>
                    ) : (
                        <Col span={24} md={12}>

                            {(value === 'cash') ?
                                <Input label={'Cheque/DD no'} name={'chequeNo'} disabled={true} />
                                :
                                <Input label={'Cheque/DD no'} name={'chequeNo'} placeholder={"Enter Cheque or DD number"} rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Cheque/DD number!'
                                    }
                                ]} />

                            }
                        </Col>
                    )
                }

                <Col span={24} md={12}>
                    <Input label={'Bank'} name={'bank'} placeholder={"Enter from which bank "} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Amount'} min={1.00} precision={2} name={'amount'} placeholder={'Amount'} rules={[
                        {
                            required: true,
                            message: 'Please Enter the amount !',
                        }
                    ]} />
                </Col>

            </Row>
            <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
                <Button.Primary text={'SUBMIT'} htmlType={'submit'} />
                <Button.Danger text={'CANCEL'} onClick={() => onReset()} />
            </Flex>
        </Form>
    )
}
