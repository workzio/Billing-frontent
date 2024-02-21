import { Form } from 'antd';
import React from 'react'
import Input from '../../../../../Components/Form/Input';
import Button from '../../../../../Components/Form/Button';
import Flex from '../../../../../Components/Flex';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';


const UnitModal = ({ handleOk, HandlesetCatLoad }) => {
    const [form] = Form.useForm();


    const onFinish = (values) => {
        PostUnit(values);
        handleOk(false);

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields();
    }
 
    const PostUnit = (values) => {

        request.post('unit/save', values)
            .then(function (response) {
                toast.success('Unit Added Successfully !')
                handleOk();
                HandlesetCatLoad(1)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <Form
    
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <div style={{ margin: '50px 0px' }}>
                    <Input
                        placeholder={['Add Unit']}
                        name={'unitname'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Unit!',
                            },
                        ]} />
                </div>
                <Flex center gap={'10px'}>
                    <Button.Success text={'Save'} htmlType={'submit'} />
                    <Button.Danger text={'Cancel'} onClick={onReset}/>
                </Flex>
            </Form><br />
      
        </div>
    )
}

export default UnitModal