import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { Row } from '../../../../../Components/Row';
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import request from '../../../../../utils/request';
import { ReportTitle } from '../../../../../Components/Styled';
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker';

export const SelectDate = ({ label, url, setDaybookList }) => {


    const [date, setDate] = useState([]);

    const [form] = Form.useForm();

    const handleDateChange = (dates) => { 
        setDate(dates);
    };

    const onFinish = (values) => { 
        const newValue = { ...values, startDate: date }

        ProductReport(newValue)
    };


    useEffect(() => {
        getSalesList();
    }, [])


    const getSalesList = () => {
        request.get('daybook/filter')
            .then(function (response) {
                setDaybookList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const ProductReport = (values) => {

        request.post(url, values)
            .then(function (response) {
                setDaybookList(response.data)
            })

            .catch(function (error) {
                console.log(error, '//////');
            });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
        getSalesList();
    };


    return (
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            autoComplete='off'>

            <ReportTitle>Search Date</ReportTitle>

            <Row gutter={[24, 24]} >
                <Col md={6}></Col>
                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={label}
                        name={'startDate'}
                        onChange={handleDateChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Date!',
                            }
                        ]} />
                </Col>

                <Flex center gap={'20px'} W_100>
                    <Button.Primary text={'Search'} htmlType={'submit'} />
                    <Button.Danger text={'Reset'} onClick={() => onReset()} />
                </Flex>
            </Row>
        </Form>
        
    )
}
