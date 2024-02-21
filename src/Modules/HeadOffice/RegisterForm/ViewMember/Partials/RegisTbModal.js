import { Col, Form } from 'antd';
import React, { useState } from 'react'
import { Row } from '../../../../../Components/Row';
import Input from '../../../../../Components/Form/Input';
import Button from '../../../../../Components/Form/Button';
import Flex from '../../../../../Components/Flex';
import { Select } from '../../../../../Components/Form/Select';


const RegisTbModal = ({ setCashOut, handleOk }) => {
    const [form] = Form.useForm();
    const [editingStudent, setEditingStudent] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);


    const handleOnChange = (date) => {
        setSelectedDate(date);
    };
    const onFinish = (record) => {
        setCashOut(record)
        form.resetFields();
        handleOk(false);

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
            label: 'Trans',
            value: 'trans',
        },
    ]
    const Items = [
        {
            label: 'Marketing',
            value: 'marketing',
        },
        {
            label: 'Distribution',
            value: 'distribution',
        },
    ]
    const Status = [
        {
            label: 'Single',
            value: 'single',
        },
        {
            label: 'Married',
            value: 'married',
        },
    ]
    return (
        <div>
            <Form
                name="sales"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={

                    {
                        id: setCashOut.id,
                        name: setCashOut.name,
                        number: setCashOut.number,
                        design: setCashOut.design,
                        status: setCashOut.status,
                    }
                }
                autoComplete="off">
                <Row gutter={[12, 12]} style={{ backgroundColor: 'white', padding: '25px' }}>
                    <Col span={24} md={12}>
                        <Input placeholder={'Id'}
                            name={'id'}
                            label={'Member ID'}
                            value={editingStudent?.id} onChange={(e) => {
                                setEditingStudent((pre) => {
                                    return { ...pre, id: e.target.value };
                                });
                            }} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Name :'} placeholder={'Name'} name={'name'} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Phn.no  :'} placeholder={'Number'} name={'number'}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }} />
                    </Col>
                    <Col span={24} md={12}>
                        <Select label={'Designation :'} options={Items} placeholder={'Designation'} name={'design'} buttonLabel={'Add Designation'} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Status :'} options={Status} on placeholder={'Status'} name={'status'} />
                    </Col>
                    <Col span={24} md={12} offset={12}></Col><br />
                    <Flex spaceAround center gap>
                        <Button.Success text={'Save Details'}></Button.Success>&nbsp;
                        <Button.Danger text={'Cancel'}></Button.Danger>&nbsp;
                    </Flex>
                </Row>
            </Form>
        </div>
    )
}

export default RegisTbModal