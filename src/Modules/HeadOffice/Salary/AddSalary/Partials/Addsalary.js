import React, { useEffect, useState } from 'react'
import { Form, Col, } from 'antd'
import { Row } from '../../../../../Components/Row'
import Input from '../../../../../Components/Form/Input'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber'
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { Select } from '../../../../../Components/Form/Select'
import request from '../../../../../utils/request'
import { toast } from 'react-toastify'

export const Addsalary = ({ record, trigger, handleleSalaryUpdate }) => {
    
    const [form] = Form.useForm()

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

    const [salary, setSalary] = useState(null)

    const [member, setMember] = useState([])

    const [memberId, setmemberId] = useState(null)

    const [selectedMember, setselectedMember] = useState()

    const [advAmount, setAdvAmount] = useState()

    useEffect(() => {
        getMember()
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            memberid: memberId,
            role_name: selectedMember?.role_name,
            phone: selectedMember?.phone,
            advanceAmount:advAmount
        })
    }, [memberId,advAmount])

    useEffect(() => {
        if (record) {
            SetFields()
            setselectedMember(record)
        }
    }, [record, trigger])

    const SetFields = () => {
        const personDate = new Date(record?.salary_date);
        const dateFormat = 'YYYY/MM/DD';
        const personFormattedDate = dayjs(personDate).format(dateFormat);
        form.setFieldsValue({
            name: record.name,
            memberid: record.memberid,
            roleId: record.role_id,
            role_name: record.role_name,
            salaryDate: dayjs(personFormattedDate, dateFormat),
            phone: record.phone,
            paymentType: record.payment_type,
            advanceAmount: record.advance_amount,
            amount: record.amount
        })
    }



    const options = [
        {
            label: 'Advance',
            value: 'advanceAmount',
        },
        {
            label: 'Full Payment',
            value: 'fullPayment',
        },
    ]

    const getMember = () => {
        request.get('rolelist')
            .then(response => {
                setMember(response.data)
            })
            .catch(error => console.log(error, 'errorr'))
    }

    const nameOptions = member?.map(val => ({
        label: val.name,
        value: val.name
    }))

    const handleNameOptions = (e) => {


        const selectedMem = member?.find((item) => item.name === e)
        setmemberId(selectedMem.memberid)
        setselectedMember(selectedMem)
        const newValues = {
            memberid: selectedMem.memberid,
        }
        SendMemberId(newValues)
    }


    const SendMemberId = (value) => {

        request.post('member/report', value)
            .then(response => {
                console.log(response.data, 'imposter');
                setAdvAmount(response.data[0].advance_amount)
            })
            .catch(error => console.log(error, 'error'))
    }
    const handleOptions = (e) => {
        setSalary(e)
    }

    const handleAmountChange = (e) => {
        if (e <= 0) {
            form.resetFields(['amount'])
        }
    }
    const onFinish = (value) => {
        const newValues = {
            ...value,
            salaryDate: selectedDate,
            roleId: selectedMember.role_id,
        };
        if (record) {
            updateData(newValues)
        } else {
            postData(newValues)
        }
    }

    const postData = (value) => {
        request.post('salary/save', value)
            .then(response => {
                toast.success('Salary Added Successfully !')
                setSalary(null)
                setmemberId(null)
                setselectedMember()
                form.resetFields()
                setAdvAmount()
            })
            .catch(error => console.log(error, 'error'))
    }

    const updateData = (value) => {
        request.put(`salary/edit/${record.salary_id}`, value)
            .then(response => {
                toast.info('Salary Updated Successfully !')
                setSalary(null)
                setmemberId(null)
                setselectedMember()
                handleleSalaryUpdate()
                form.resetFields()
            })
            .catch(error => console.log(error, 'error'))
    }


    const onFinishFailed = (value) => {
        console.log(value);

    }
    const dateOnChange = (ddd) => {
        setSelectedDate(ddd)
    }

    const onReset = () => {
        form.resetFields()
        setSalary(null)
        setmemberId(null)
        setselectedMember({})
        setAdvAmount()
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
                salaryDate: dayjs(),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <Row gutter={[24, 24]}>
                <Col span={24} md={12}>
                    <Select options={nameOptions} onChange={handleNameOptions} label={'Name'} placeholder={'Enter name'} name={'name'} rules={[
                        {
                            required: true,
                            message: 'This field is required !'
                        }
                    ]} />
                    <Input name={'memberid'} display={'none'} />
                    <Input name={'roleId'} display={'none'} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Role'} disabled={true} name={'role_name'} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Phone Number'} disabled={true} name={'phone'} />
                </Col>
                <Col span={24} md={12}>
                    <CustomDatePicker label={'Date'} onChange={dateOnChange} name={'salaryDate'} rules={[
                        {
                            required: true,
                            message: 'This field is required !'
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <Select onChange={handleOptions} options={options} label={'Salary'} placeholder={'Select salary type'} name={'paymentType'} rules={[
                        {
                            required: true,
                            message: 'This field is required !'
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber label={'Advance Amount'} name={'advanceAmount'} disabled />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber onChange={handleAmountChange} precision={2} label={'Amount'} placeholder={'Enter amount'} name={'amount'} rules={[
                        {
                            required: true,
                            message: 'This field is required !'
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                </Col>
                <Flex center W_100 gap={'20px'}>
                    <Button.Primary text={'Save'} htmlType={'submit'} />
                    <Button.Danger text={'Clear'} onClick={onReset} />
                </Flex>
            </Row>
        </Form>
    )
}
