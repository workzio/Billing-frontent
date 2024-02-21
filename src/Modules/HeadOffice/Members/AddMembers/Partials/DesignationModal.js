import React, { useEffect } from 'react'
import Button from '../../../../../Components/Form/Button'
import Flex from '../../../../../Components/Flex'
import Input from '../../../../../Components/Form/Input'
import { Form } from 'antd'
import request from '../../../../../utils/request'

export const DesignationModal = ({ trigger, handleOk, HandleTrigger }) => {

    const [form] = Form.useForm()

    useEffect(() => {
        form.resetFields()
    }, [trigger])

    const onFinish = (value) => {
        form.resetFields();
        handleOk();
        postData(value)
    }

    const postData = (value) => {
        request.post('role/save', value)
            .then(response => {
                HandleTrigger(3)
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
                <Input placeholder={'Add designation'}
                    name={'roleName'}
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter Designation!',
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
