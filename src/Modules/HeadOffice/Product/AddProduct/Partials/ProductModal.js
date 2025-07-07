import { Form } from 'antd';
import React, { useEffect } from 'react'
import Input from '../../../../../Components/Form/Input';
import Button from '../../../../../Components/Form/Button';
import Flex from '../../../../../Components/Flex';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';


const ProductModal = ({ handleOk, HandlesetCatLoad, setCategory }) => {
    const [form] = Form.useForm();


    const onFinish = (values) => {
        Post_Category(values);
        form.resetFields();

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields();
    }
    
    const Post_Category = (values) => {

        request.post('category/save', values)
            .then(function (response) {
                toast.success('Category Added Successfully !')
                handleOk();
                HandlesetCatLoad(1)
                setCategory(values)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
          <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <div style={{ margin: '50px 0px' }}>
                    <Input
                        placeholder={['Add Category']}
                        name={'category'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Category!',
                            },
                        ]} />
                </div>
                <Flex center gap={'10px'}>
                    <Button.Success text={'Save'} htmlType={'submit'} />
                    <Button.Danger text={'Cancel'} onClick={onReset} />
                </Flex>
            </Form>
    )
}

export default ProductModal