import React, { useEffect } from 'react'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import Input from '../../../../../Components/Form/Input'
import request from '../../../../../utils/request'
import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'

export const AddBranchModal = ({ handleOk, HandleRefreshTrigger,branchTrigger }) => {

    const [form] = useForm()

    useEffect(() => {
      form.resetFields()
    }, [branchTrigger])
    
    const onFinish = (value) => {
        form.resetFields();
        handleOk()
        postData(value)
    }

    const postData = (value) => {
        request.post('branch/save', value)
            .then(response => {
                console.log(response.data, 'branch savedddddd');
                HandleRefreshTrigger(3)
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
                <Input placeholder={'Add Bank Branch'}
                    name={'branchName'}
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter Bank Branch Name!',
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
