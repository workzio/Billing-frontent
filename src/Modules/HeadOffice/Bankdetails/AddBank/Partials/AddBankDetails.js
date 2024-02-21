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
import { useForm } from 'antd/es/form/Form'
import request from '../../../../../utils/request'
import { toast } from 'react-toastify'
import { CustomSelect } from '../../../../../Components/Form/CustomSelect'
import { Modal } from '../../../../../Components/Modal'
import { AddBankModal } from './AddBankModal'
import { AddBranchModal } from './AddBranchModal'
import Switch from '../../../../../Components/Form/Switch'

//This is internal transaction page
export const AddBankDetails = ({ record, trigger, handleUpdateInternalTrans }) => {

    const [form] = useForm()

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

    const [openModal, setOpenModal] = useState(false)

    const [modalTitle, setModalTitle] = useState("");

    const [modalContent, setModalContent] = useState(null);

    const [bank, setBank] = useState([])

    const [bankId, setBankId] = useState()

    const [bankNameTrigger, setBankNameTrigger] = useState(1)

    const [refreshTrigger, setRefreshTrigger] = useState(1)

    const [branch, setBranch] = useState([])

    const [branchId, setBranchId] = useState()

    const [branchTrigger, setBranchTrigger] = useState(1)

    const [ownAccount, setOwnAccount] = useState([])

    const [selectedOwnAcc, setSelectedOwnAcc] = useState()

    useEffect(() => {
        form.setFieldsValue({
            bankName: selectedOwnAcc?.bankName,
            branchName: selectedOwnAcc?.branchName,
            accountNumber: selectedOwnAcc?.accountNumber,
            ifscCode: selectedOwnAcc?.ifscCode,
            phoneNumber: selectedOwnAcc?.phoneNumber,
            bankId: selectedOwnAcc?.bankId
        })
    }, [selectedOwnAcc])

    useEffect(() => {
        if (record) {
            SetFields()
        }
    }, [record, trigger])

    useEffect(() => {
        GetOwnAccounts()
    }, [])


    const options = [
        {
            label: 'Credit',
            value: 'credit',
        },
        {
            label: 'Debit',
            value: 'debit',
        },
    ]

    const SetFields = () => {
        form.setFieldsValue(record)
        const personDate = new Date(record?.in_transcation_date);
        const dateFormat = 'YYYY/MM/DD';
        const personFormattedDate = dayjs(personDate).format(dateFormat);
        form.setFieldsValue({
            inTranscationDate: dayjs(personFormattedDate, dateFormat),
            accountHolderName: record.account_holder_name,
            bankName: record.bank_name,
            accountNumber: record.account_number,
            inTranscationAmount: record.in_transcation_amount,
            bankId: record.bank_id,
            bankName: record.bank_name,
            branchName: record.branch_name,
            ifscCode: record.ifsc_code,
            paymentType: record.payment_type,
            phoneNumber: record.phone_number,
        });
    }

    const GetOwnAccounts = () => {
        request.get('bank/true')
            .then(response => {
                setOwnAccount(response.data)
                console.log(response.data, 'response.data');
            })
            .catch(error => console.log(error, 'erroror'))
    }

    const HandleRefreshTrigger = (val) => {
        setRefreshTrigger(val + 1)
    }

    const handleButtonClick = () => {
        setBankNameTrigger(bankNameTrigger + 1)
        setModalTitle('Add Bank')
        setModalContent(<AddBankModal HandleRefreshTrigger={HandleRefreshTrigger} handleOk={handleOk} bankNameTrigger={bankNameTrigger} />)
        showModal()
    }


    const handleBankIdChange = (e) => {
        const selectedBank = bank?.find((item) => item.bankName === e)
        setBankId(selectedBank.bankNameId)
    }

    const handleBranchButtonClick = () => {
        setBranchTrigger(branchTrigger + 1)
        setModalTitle('Add Branch')
        setModalContent(<AddBranchModal branchTrigger={branchTrigger} handleOk={handleOk} HandleRefreshTrigger={HandleRefreshTrigger} />)
        showModal()
    }

    const handleBranchIdChange = (r) => {
        const selectedBranch = branch?.find((item) => item.branchName === r)
        setBranchId(selectedBranch.branchNameId)
        console.log(selectedBranch, 'selectedBranch');
    }

    useEffect(() => {
        form.setFieldsValue({ bankNameId: bankId })
    }, [bankId])

    useEffect(() => {
        form.setFieldsValue({ branchNameId: branchId })
    }, [branchId])

    const bankData = bank?.map(val => ({
        label: val.bankName,
        value: val.bankName
    }))

    const branchData = branch?.map(val => ({
        label: val.branchName,
        value: val.branchName
    }))

    const onFinish = (value) => {
        const newValues = { ...value, inTranscationDate: selectedDate }
        if (record) {
            UpdateBankdetails(newValues)
        } else {
            PostData(newValues)
        }
        console.log(newValues, 'aaa');
    }

    const PostData = (value) => {
        request.post('inTranscation/save', value)
            .then(response => {
                toast.success('Transaction Successs!')
                GetOwnAccounts()
                form.resetFields()
            })
            .catch(error => console.log(error, 'error'))
    }

    const UpdateBankdetails = (value) => {
        console.log(value, 'valueeeeeee');
        request.put(`inTranscation/edit/${record.in_transcation_id}`, value)
            .then(response => {
                console.log(response, 'updated');
                toast.info('Updated Successfully!')
                handleUpdateInternalTrans()
                form.resetFields()

            })
            .catch(error => console.log(error, 'error'))
    }

    const OwnAccountNames = ownAccount?.map(val => ({
        label: val.accountHolderName,
        value: val.accountHolderName
    }))

    const handleOwnAccNameChange = (e) => {
        console.log(e, 'eeee');
        const selectedAccount = ownAccount?.find(item => item.accountHolderName === e)
        setSelectedOwnAcc(selectedAccount)
    }

    const onFinishFailed = (value) => {
        console.log(value);
    }

    const showModal = () => {
        setOpenModal(true);
    };

    const handleOk = () => {
        setOpenModal(false);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const dateOnChange = (ddd) => {
        setSelectedDate(ddd)
    }

    const onReset = () => {
        form.resetFields()
        setBankId(null)
        setSelectedOwnAcc()
    }

    return (
        <>
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
                    date: dayjs()
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Row gutter={[24, 24]}>
                    <Col span={24} md={12}>
                        <Select label={'Account Holder Name'} onChange={handleOwnAccNameChange} placeholder={'Select account holder'} name={'accountHolderName'} options={OwnAccountNames}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required !'
                                }
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <Input
                            label={'Bank Name'}
                            name={'bankName'}
                            disabled
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required !'
                                }
                            ]} />
                        <Input name={'bankId'} display={'none'} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input
                            label={'Branch Name'}
                            name={'branchName'}
                            disabled
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required !'
                                }
                            ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'IFSC Code'} disabled name={'ifscCode'} rules={[
                            {
                                required: true,
                                message: 'This field is required !'
                            }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInputNumber label={'Account Number'} disabled name={'accountNumber'} rules={[
                            {
                                required: true,
                                message: 'This field is required !'
                            }
                        ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInputNumber label={'Phone Number'} disabled name={'phoneNumber'} rules={[
                            {
                                required: true,
                                message: 'This field is required !'
                            }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomDatePicker label={'date'} placeholder={'date'} onChange={dateOnChange} name={'inTranscationDate'} rules={[
                            {
                                required: true,
                                message: 'This field is required !'
                            }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <Select options={options} label={'Payment Type'} placeholder={'Select payment Type'} name={'paymentType'} rules={[
                            {
                                required: true,
                                message: 'This field is required !'
                            }
                        ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInputNumber precision={2} label={'Amount'} placeholder={'Enter amount'} name={'inTranscationAmount'} rules={[
                            {
                                required: true,
                                message: 'This field is required !'
                            }
                        ]} />
                    </Col>
                    <Flex center W_100 gap={'20px'}>
                        <Button.Success text={'Save'} htmlType={'submit'} />
                        <Button.Danger text={'Clear'} onClick={onReset} />
                    </Flex>
                </Row>
                <Modal isVisible={openModal} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />

            </Form>
        </>
    )
}
