import React, { useEffect, useState } from 'react'
import { Form, Col } from 'antd'
import { Row } from '../../../../../Components/Row'
import Input from '../../../../../Components/Form/Input'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber'
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import { Select } from '../../../../../Components/Form/Select'
import dayjs from 'dayjs'
import request from '../../../../../utils/request'
import { CustomSelect } from '../../../../../Components/Form/CustomSelect'
import { Modal } from '../../../../../Components/Modal'
import { AddBankModal } from '../../AddBank/Partials/AddBankModal'
import { AddBranchModal } from '../../AddBank/Partials/AddBranchModal'
import { useForm } from 'antd/es/form/Form'
import { toast } from 'react-toastify'

export const BankDetailsFrom = () => {

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

  const handleButtonClick = () => {
    setBankNameTrigger(bankNameTrigger + 1)
    setModalTitle('Add Bank')
    setModalContent(<AddBankModal handleOk={handleOk} bankNameTrigger={bankNameTrigger} />)
    showModal()
  }

  const handleBankIdChange = (e) => {
    const selectedBank = bank?.find((item) => item.bankName === e)
    setBankId(selectedBank.bankNameId)
  }

  const handleBranchButtonClick = () => {
    setBranchTrigger(branchTrigger + 1)
    setModalTitle('Add Branch')
    setModalContent(<AddBranchModal branchTrigger={branchTrigger} handleOk={handleOk} />)
    showModal()
  }

  const handleBranchIdChange = (r) => {
    const selectedBranch = branch?.find((item) => item.branchName === r)
    setBranchId(selectedBranch.branchNameId)
    console.log(selectedBranch, 'selectedBranch');
  }

  const bankData = bank?.map(val => ({
    label: val.bankName,
    value: val.bankName
  }))

  const branchData = branch?.map(val => ({
    label: val.branchName,
    value: val.branchName
  }))

  const bankOptions = [
    {
      label: 'Own Account',
      value: 'ownAccount'
    },
    {
      label: 'Customer Account',
      value: 'customerAccount'
    },

  ]

  const onFinish = (value) => {
    PostData(value)
  }

  const PostData = (value) => {
    console.log(value,'ppppp');
    request.post('addbank/save', value)
      .then(response => {
        toast.success('Bank Details Added Successfully !')
        form.resetFields()
        console.log(response.data, 'response');
      })
      .catch(error => console.log(error, 'error'))
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
        date: dayjs()
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Row gutter={[24, 24]}>
        <Col span={24} md={12}>
          <Select label={'Account Type'} name={'accountType'} options={bankOptions} placeholder={'Select account type'}
            rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
        </Col>
        <Col span={24} md={12}>
          <Input
            label={'Bank Name'}
            placeholder={'Enter bank name'}
            name={'bankName'}
            rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
        </Col>
        <Col span={24} md={12}>
          <Input
            label={'Branch Name'}
            placeholder={'Select branch name'}
            name={'branchName'}
            rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
        </Col>
        <Col span={24} md={12}>
          <Input label={'Account Number'} placeholder={'Enter account number'} name={'accountNumber'} rules={[
            {
              required: true,
              message: 'This field is required !'
            }
          ]} />
        </Col>
        <Col span={24} md={12}>
          <Input label={'Account Holder Name'} placeholder={'Enter account holder name'} name={'accountHolderName'} rules={[
            {
              required: true,
              message: 'This field is required !'
            }
          ]} />
        </Col>
        <Col span={24} md={12}>
          <Input label={'IFSC Code'} placeholder={'Enter ifsc code'} name={'ifscCode'} rules={[
            {
              required: true,
              message: 'This field is required !'
            }
          ]} />
        </Col>
        <Col span={24} md={12}>
          <CustomInputNumber label={'Phone Number'} placeholder={'Enter phone number'} name={'phoneNumber'} rules={[
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
  )

}



