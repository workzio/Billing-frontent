import React, { useEffect } from 'react'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { Form } from 'antd'
import Input from '../../../../../Components/Form/Input'
import { useForm } from 'antd/es/form/Form'
import request from '../../../../../utils/request'

export const AddBankModal = ({ handleOk,bankNameTrigger,HandleRefreshTrigger }) => {

    const [form] = useForm();

    useEffect(() => {
        form.resetFields()
    }, [bankNameTrigger])

    const onFinish = (value) => {
        form.resetFields();
        handleOk()
        postData(value)
    }

    const postData = (value) => {
        request.post('bankname/save', value)
        .then(response => {
            console.log(response,'bank name addded');
            HandleRefreshTrigger(2)
        })
        .catch(error => console.log(error,'error'))
    }

    const onFinishFailed = (value) => {
        console.log(value);
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div style={{ margin: '30px 0px' }}>
                <Input placeholder={'Add Bank'}
                    name={'bankName'}
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter Bank Name !',
                        },
                    ]} />
            </div>
            <Flex center gap={'20px'} >
                <Button.Primary text={'Save'} htmlType={'submit'} />
                <Button.Danger text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form>
    )
}
