import React, { useEffect, useState } from 'react'
import { Form, Col, } from 'antd'
import { Row } from '../../../../../Components/Row'
import Input from '../../../../../Components/Form/Input'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber'
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import { TextAreas } from '../../../../../Components/Form/TextArea'
import { CustomSelect } from '../../../../../Components/Form/CustomSelect'
import Radio from '../../../../../Components/Form/RadioButton'
import dayjs from 'dayjs'
import { Modal } from '../../../../../Components/Modal'
import { DesignationModal } from './DesignationModal'
import request from '../../../../../utils/request'
import { toast } from 'react-toastify'

export const AddMember = ({ record, viewMemTrigger, HandleUpdateMember }) => {

    const [value, setValue] = useState(null)

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

    const [role, setRole] = useState([])

    const [roleId, setRoleId] = useState()

    const [openModal, setOpenModal] = useState(false)

    const [modalTitle, setModalTitle] = useState("");

    const [modalContent, setModalContent] = useState(null);

    const [trigger, setTrigger] = useState(1)

    useEffect(() => {
        getRoleList()
    }, [trigger])

    useEffect(() => {
        if (record) {
            SetFields()
        }
    }, [record, viewMemTrigger])

    useEffect(() => {
        form.setFieldsValue({ roleId: roleId })
    }, [roleId])

    const SetFields = () => {
        form.setFieldsValue(record)
        const personDate = new Date(record?.dob);
        const dateFormat = 'YYYY/MM/DD';
        const personFormattedDate = dayjs(personDate).format(dateFormat);

        form.setFieldsValue({
            dob: dayjs(personFormattedDate, dateFormat),
            panNo: record.pan_no,
            roleId: record.role_id
        });
        setRoleId(record.role_id)
    }

    const getRoleList = () => {
        request.get('role')
            .then(response => {
                setRole(response.data)
            })
            .catch(error => console.log(error, 'errorrrr'))
    }


    const [form] = Form.useForm()

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
            label: 'Transgender',
            value: 'transgender',
        },
    ]

    const showModal = () => {
        setOpenModal(true);
    };
    const handleOk = () => {
        setOpenModal(false);
    };
    const handleCancel = () => {
        setOpenModal(false);
    };
    const genderOnChange = (val) => {
        setValue(val.target.value)
    }

    const dateOnChange = (ddd) => {
        setSelectedDate(ddd)
    }

    const handleRoleIdChange = (e) => {
        const selectedRole = role?.find((item) => item.roleName === e)
        setRoleId(selectedRole.roleId)
    }


    const  handleButtonClick = () => {
        setTrigger(2)
        setModalTitle('Add Designation')
        setModalContent(<DesignationModal HandleTrigger={HandleTrigger} trigger={trigger} handleOk={handleOk} />)
        showModal()
    }

    const HandleTrigger = (arg) => {
        setTrigger(arg)
    }

    const onFinish = (value) => {
        const newValues = { ...value, dob: selectedDate }
        if (record) {
            update_member(newValues)
        } else {
            add_member(newValues)
        }
    }

    const add_member = (value) => {
        request.post('member/save', value)
            .then(response => {
                toast.success('Member Added Successfully !')
                form.resetFields()
            })
            .catch(error => console.log(error, 'error'))
    }

    const update_member = (values) => {
        request.put(`member/edit/${record.memberid}`, values)
            .then(response => {
                toast.info('Member Updated Successfully!')
                HandleUpdateMember();
                form.resetFields()
            })
            .catch(error => console.log('error', error))
    }

    const onFinishFailed = (value) => {
        console.log(value);
    }

    const onReset = () => {
        form.resetFields();
        setRoleId(null);
    }

    const designationData = role.map(val => ({
        label: val.roleName,
        value: val.roleName
    }))

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
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <Row gutter={[24, 24]}>
                <Col span={24} md={12}>
                    <Input label={'Name'} placeholder={'Enter member name'} name={'name'} rules={[
                        {
                            required: true,
                            message: 'This field is required !'
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomDatePicker label={'Date of Birth'} name={'dob'} onChange={dateOnChange} />
                </Col>
                <Col span={24} md={12}>
                    <p style={{ marginBottom: '10px', marginTop: '5px', fontWeight: '700', opacity: 0.7 }}>Gender</p>
                    <div>
                        <Flex>
                            <Radio label={'Gender'} name={'gender'} value={value} options={RadioData} onChange={genderOnChange} rules={[
                                {
                                    required: true,
                                    message: 'This field is required !'
                                }
                            ]} />
                        </Flex>
                    </div>
                </Col>
                <Col span={24} md={12}>
                    <CustomSelect
                        label={'Designation'}
                        name={'role_name'}
                        showSearch={true}
                        options={designationData}
                        onButtonClick={handleButtonClick}
                        onChange={handleRoleIdChange}
                        value={role}
                        rules={[
                            {
                                required: true,
                                message: 'This field is required !'
                            }
                        ]}
                    />
                    <Input name={'roleId'} display={'none'}/>
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Phone Number'} placeholder={'Enter phone number'} name={'phone'} rules={[
                        {
                            required: true,
                            message: 'This field is required !'
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input type={'email'} name={'email'} placeholder={'Enter email id'} label={'Email Id'} />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber label={'Aadhar Number'} placeholder={'Enter aadhar number'} name={'aadharno'} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'PAN Number'} placeholder={'Enter PAN number'} name={'panNo'} />
                </Col>
                <Col span={24} md={12}>
                    <TextAreas label={'Address'} placeholder={'Enter address'} name={'address'} />
                </Col>
                <Col span={24} md={12}>
                    <TextAreas label={'Description'} placeholder={'Enter description'} name={'description'} />
                </Col>
                <Flex center gap={'20px'} W_100 >
                    <Button.Success text={'Save'} htmlType={'submit'} />
                    <Button.Danger text={'Clear'} onClick={() => onReset()} />

                </Flex>
            </Row>
            <Modal isVisible={openModal} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />
        </Form>
    )
}
