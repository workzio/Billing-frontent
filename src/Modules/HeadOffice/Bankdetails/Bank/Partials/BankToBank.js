import { Form, Col } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { Row } from '../../../../../Components/Row'
import Input from '../../../../../Components/Form/Input'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber'
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { Select } from '../../../../../Components/Form/Select'
import { toast } from 'react-toastify'
import request from '../../../../../utils/request'
import { CustomSelect } from '../../../../../Components/Form/CustomSelect'
import { Modal } from '../../../../../Components/Modal'
import { AddBranchModal } from '../../AddBank/Partials/AddBranchModal'
import { AddBankModal } from '../../AddBank/Partials/AddBankModal'
import { AddPlatformModal } from '../../AddBank/Partials/AddPlatformModal'
import { CustomCardView } from '../../../../../Components/CustomCardView'

export const BankToBank = () => {

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


  useEffect(() => {
    GetBanksName()
    GetBranchName()
  }, [refreshTrigger])


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


  const GetBanksName = () => {
    request.get('bankname')
      .then(response => {
        console.log(response.data, 'BANK NAMES');
        setBank(response.data)
      })
      .catch(error => console.log(error, 'errorrr'))
  }

  const GetBranchName = () => {
    request.get('branch')
      .then(response => {
        setBranch(response.data)
        console.log(response.data, 'branch names');
      })
      .catch(error => console.log(error, 'errorrr'))
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

  const handleBranchButtonClick = () => {
    setBranchTrigger(branchTrigger + 1)
    setModalTitle('Add Branch')
    setModalContent(<AddBranchModal branchTrigger={branchTrigger} handleOk={handleOk} HandleRefreshTrigger={HandleRefreshTrigger} />)
    showModal()
  }

  const handleBankIdChange = (e) => {
    const selectedBank = bank?.find((item) => item.bankName === e)
    setBankId(selectedBank.bankNameId)
  }

  const handleBranchIdChange = (r) => {
    const selectedBranch = branch?.find((item) => item.branchName === r)
    setBranchId(selectedBranch.branchNameId)
    console.log(selectedBranch, 'selectedBranch');
  }

  const onFinish = (value) => {
    const newValues = { ...value, date: selectedDate }
    form.resetFields()
    PostData(newValues)
    console.log(newValues, 'aaa');
  }

  const PostData = (value) => {
    request.post('bank/save', value)
      .then(response => {
        toast.success('Bank Details Added Successfully!')
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
    <CustomCardView>
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
            <CustomSelect
              label={'Bank Name'}
              placeholder={'Enter bank name'}
              name={'bankName'}
              showSearch={true}
              onButtonClick={handleButtonClick}
              onChange={handleBankIdChange}
              value={bank}
              options={bankData}
              rules={[
                {
                  required: true,
                  message: 'This field is required !'
                }
              ]} />
            <Input name={'bankNameId'} display={'none'} />
          </Col>
          <Col span={24} md={12}>
            <CustomSelect
              label={'Branch Name'}
              placeholder={'Enter branch name'}
              name={'branchName'}
              showSearch={true}
              onButtonClick={handleBranchButtonClick}
              onChange={handleBranchIdChange}
              value={branch}
              options={branchData}
              rules={[
                {
                  required: true,
                  message: 'This field is required !'
                }
              ]} />
            <Input name={'branchNameId'} display={'none'} />
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

          </Col>
          <Col span={24} md={12}>
          </Col>
          <Col span={24} md={12}>
          </Col>
          <Col span={24} md={12}>
          </Col>
          <Col span={24} md={12}>
          </Col>
        </Row>

        <Modal isVisible={openModal} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />

      </Form>
    </CustomCardView>
  )
}
