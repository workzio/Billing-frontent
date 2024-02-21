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
import Switch from '../../../../../Components/Form/Switch'
import { FormTitle } from '../../../../../Components/Form/FormTitle'
import { CustomSwitch } from '../../../../../Components/Form/CustomSwitch'

export const OnlineTransaction = ({ record, trigger, HandleUpdateOnlineTransac }) => {

  const [form] = useForm()

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

  const [openModal, setOpenModal] = useState(false)

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);

  const [platform, setPlatform] = useState([])

  const [resetTrigger, setResetTrigger] = useState(0)

  const [click, setClick] = useState(true)

  const [customerAccount, setCustomerAccount] = useState([])

  const [selectedCustomerAcc, setSelectedCustomerAcc] = useState()

  const [ownAccount, setOwnAccount] = useState([])

  const [selectedOwnAcc, setSelectedOwnAcc] = useState()


  useEffect(() => {
    GetCustomerAccounts()
    GetOwnAccounts()
  }, [])



  useEffect(() => {
    form.setFieldsValue({
      ownBankName: selectedOwnAcc?.bankName,
      ownBranchName: selectedOwnAcc?.branchName,
      ownAccountNumber: selectedOwnAcc?.accountNumber,
      ownBankId: selectedOwnAcc?.bankId
    })
  }, [selectedOwnAcc])

  useEffect(() => {
    form.setFieldsValue({
      customerBankName: selectedCustomerAcc?.bankName,
      customerBranchName: selectedCustomerAcc?.branchName,
      customerAccountNumber: selectedCustomerAcc?.accountNumber,
      clientBankId: selectedCustomerAcc?.bankId
    })
  }, [selectedCustomerAcc])

  useEffect(() => {
    if (record) {
      setFields()
    }
  }, [record, trigger])

  const setFields = () => {
    const personDate = new Date(record?.date);
    const dateFormat = 'YYYY/MM/DD';
    const personFormattedDate = dayjs(personDate).format(dateFormat);
    form.setFieldsValue({
      date: dayjs(personFormattedDate, dateFormat),
      ownAccountNumber: record.own_account_number,
      ownBankName: record.own_bank_name,
      ownBankId: record.own_bank_id,
      ownAccountHolderName: record.own_account_holder_name,
      ownBranchName: record.own_branch_name,
      ownIfscCode: record.own_ifsc_code,
      ownPhoneNumber: record.own_phone_number,
      customerAccountNumber: record.customer_account_number,
      customerBankName: record.customer_bank_name,
      clientBankId: record.client_bank_id,
      customerAccountName: record.customer_account_name,
      customerBranchName: record.customer_branch_name,
      customerIfscCode: record.customer_ifsc_code,
      customerPhoneNumber: record.customer_phone_number,
      amount: record.amount,
      paymentType: record.payment_type,
    });

  }

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

  const GetCustomerAccounts = () => {
    request.get('bank/false')
      .then(response => {
        console.log(response.data, 'customers accounts');
        setCustomerAccount(response.data)
      })
      .catch(error => console.log(error, 'erroror'))
  }

  const GetOwnAccounts = () => {
    request.get('bank/true')
      .then(response => {
        console.log(response.data, 'own accounts');
        setOwnAccount(response.data)
      })
      .catch(error => console.log(error, 'erroror'))
  }

  const onFinish = (value) => {
    const newValues = {
      date: selectedDate,
      paymentType: value.paymentType,
      amount: value.amount,
      ownBankId: value.ownBankId,
      clientBankId: value.clientBankId,
    }
    if (record) {
      UpdateData(newValues)
    } else {
      PostData(newValues)
    }
    console.log(newValues, 'aaa');
  }


  const PostData = (value) => {
    request.post('newbank/save', value)
      .then(response => {
        toast.success('Success')
        form.resetFields()
      })
      .catch(error => console.log(error, 'error'))
  }

  const UpdateData = (value) => {
    request.put(`newbank/edit/${record.new_bank_id}`, value)
      .then(response => {
        console.log(response.data, 'updated');
        toast.info('Successfully updated')
        HandleUpdateOnlineTransac()
        form.resetFields()
      })
      .catch(error => console.log(error, 'errorrrrrrrrrrr'))
  }

  const handleButtonClick = () => {
    setResetTrigger(resetTrigger + 1)
    setModalTitle('Add payment Platform')
    setModalContent(<AddPlatformModal resetTrigger={resetTrigger} handleOk={handleOk} />)
    showModal()
  }


  const CustomerAccountNames = customerAccount?.map(val => ({
    label: val.accountHolderName,
    value: val.accountHolderName
  }))

  const OwnAccountNames = ownAccount?.map(val => ({
    label: val.accountHolderName,
    value: val.accountHolderName
  }))

  const handleCustAccNameChange = (e) => {
    console.log(e, 'eeee');
    const selectedAccount = customerAccount?.find(item => item.accountHolderName === e)
    setSelectedCustomerAcc(selectedAccount)
  }

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
    setSelectedCustomerAcc()
    setSelectedOwnAcc()
  }

  const handleSwitched = (e) => {
    setClick(!click);
  };

  return (
    <div>
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
            <Select options={options} label={'Payment Type'} name={'paymentType'} rules={[
              {
                required: true,
                message: 'This field is required !'
              }]} />
          </Col>
          <Col span={24} md={12}>
          </Col>
          <Col span={24} md={12}>
            <h5 style={{ letterSpacing: '1px' }}>Account Holder Details :</h5>
          </Col>
          <Col span={24} md={12}>
          </Col>
          <Col span={24} md={12}>
            <Select options={OwnAccountNames} onChange={handleOwnAccNameChange} label={'Account Holder Name'} placeholder={'Select account holder'} name={'ownAccountHolderName'} rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
          </Col>
          <Col span={24} md={12}>
            <CustomInputNumber label={'Account Number'} disabled name={'ownAccountNumber'} rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
          </Col>
          <Col span={24} md={12}>
            <Input
              label={'Bank Name'}
              name={'ownBankName'}
              disabled
              rules={[
                {
                  required: true,
                  message: 'This field is required !'
                }
              ]} />
            <Input name={'ownBankId'} display={'none'} />
          </Col>
          <Col span={24} md={12}>
            <Input
              label={'Branch Name'}
              name={'ownBranchName'}
              disabled
              rules={[
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
            <h5 style={{ letterSpacing: '1px', marginTop: '10px' }}>Customer Details :</h5>
          </Col>
          <Col span={24} md={12}>
          </Col>
          <Col span={24} md={12}>
            <Select options={CustomerAccountNames} onChange={handleCustAccNameChange} label={'Account Holder Name'} placeholder={'Select account holder'} name={'customerAccountName'} rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
          </Col>
          <Col span={24} md={12}>
            <CustomInputNumber label={'Account Number'} disabled name={'customerAccountNumber'} rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
          </Col>
          <Col span={24} md={12}>
            <Input
              label={'Bank Name'}
              name={'customerBankName'}
              disabled
              rules={[
                {
                  required: true,
                  message: 'This field is required !'
                }
              ]} />
            <Input name={'clientBankId'} display={'none'} />
          </Col>
          <Col span={24} md={12}>
            <Input
              label={'Branch Name'}
              name={'customerBranchName'}
              disabled
              rules={[
                {
                  required: true,
                  message: 'This field is required !'
                }
              ]} />
          </Col>


          {/* <Col span={24} md={12}>
            <Select options={options} label={'Payment Type'} placeholder={'Select payment type'} name={'paymentType'} rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
          </Col> */}
          {/* <Col span={24} md={12}>
            <CustomSelect
              label={'Payment Platform'}
              placeholder={'Payment platform'}
              name={'paymentPlatform'}
              showSearch={true}
              onButtonClick={handleButtonClick}
              onChange={handlePlatformIdChange}
              value={platform}
              options={platformData}
              rules={[
                {
                  required: true,
                  message: 'This field is required !'
                }
              ]} />
            <Input name={'platformId'} display={'none'} />
          </Col> */}
          <Col span={24} md={12}>
            <CustomInputNumber precision={2} label={'Amount'} placeholder={'Enter amount'} name={'amount'} rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
          </Col>
          {/* <Col span={24} md={12}>
            <Input precision={2} label={'Phone Number'} placeholder={'Enter phone number'} name={'phoneNumber'} rules={[
              {
                required: true,
                message: 'This field is required !'
              }
            ]} />
          </Col> */}
          <Col span={24} md={12}>
            <CustomDatePicker label={'Date'} name={'date'} onChange={dateOnChange} rules={[
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
      </Form>
      <Modal isVisible={openModal} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />

    </div>

  )
}
