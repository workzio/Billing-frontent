import { Form } from 'antd'
import React, { useEffect } from 'react'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import Input from '../../../../../Components/Form/Input'
import request from '../../../../../utils/request'
import { useForm } from 'antd/es/form/Form'

export const AddPlatformModal = ({ resetTrigger,handleOk }) => {

    const [form] = useForm()

    useEffect(() => {
        form.resetFields()
    }, [resetTrigger])

    const onFinish = (value) => {
        form.resetFields();

        postData(value)
    }

    const postData = (value) => {
        request.post('', value)
            .then(response => {
                console.log(response, 'payment platform addded');
                handleOk()
            })
            .catch(error => console.log(error, 'error'))
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
                <Input placeholder={'Add Payment Platform'}
                    name={'paymentPlatform'}
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter payment platform !',
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
