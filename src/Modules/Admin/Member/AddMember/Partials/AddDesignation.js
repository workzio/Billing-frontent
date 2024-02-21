import React from 'react'
import { Bgcard, Mainsection } from '../../Style'
import { Col, Form } from 'antd'
import { Row } from '../../../../../Components/Row';
import Input from '../../../../../Components/Form/Input';
import Button from '../../../../../Components/Form/Button';
import Flex from '../../../../../Components/Flex';
import { FormTitle } from '../../../../../Components/Form/FormTitle';

const AddDesignation = ({ setMember }) => {

    const [form] = Form.useForm();


    const onFinish = (values) => {
        setMember(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

   
    
    const onReset = () => {
        form.resetFields();
    }

   
    return (
        <div>
            <Mainsection>
                <Form name="sales"
                    form={form}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                        member_id: 'IO089#',
                    }}

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <Bgcard>
                        <FormTitle Title={'Add Designation'} />
                        <Row>
                            <Col span={24} md={20}>
                                <Input
                                    type="text"
                                    name={'name'}
                                    placeholder={'Add Designation'}
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <Flex spaceEvenly>
                                    <Button.Primary htmlType="submit" text={'Add'} />
                                    <Button.Danger onClick={() => onReset()} text={'Cancel'} />
                                </Flex>
                            </Col>
                        </Row>
                    </Bgcard>
                </Form>
            </Mainsection><br />

        </div>
    )
}

export default AddDesignation