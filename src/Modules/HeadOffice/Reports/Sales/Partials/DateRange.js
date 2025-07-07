import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { Row } from '../../../../../Components/Row';
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { CustomDateRangePicker } from '../../../../../Components/Form/CustomDateRangePicker';
import request from '../../../../../utils/request';
import { ReportTitle } from '../../../../../Components/Styled';

export const DateRange = ({ label, url,setSalesList }) => {


    const [dateRange, setDateRange] = useState([]);

    const [form] = Form.useForm();

    const handleDateRangeChange = (dates) => {
        setDateRange(dates);
    };

    const onFinish = (values) => {
        const newValue = { ...values, range: dateRange }

        const value = newValue;
        const range = value.range.split(' - ');
        const startDate = range[0];
        const endDate = range[1];

        const ConvertedValue = {
            startDate: startDate,
            endDate: endDate,
        }


        SlesReport(ConvertedValue)
    };


    useEffect(() => {
        getSalesList();
    }, [])


    const getSalesList = () => {
        request.get('sales/invoice',)
            .then(function (response) {
                setSalesList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const SlesReport = (values) => {

        request.post(url, values)
            .then(function (response) {
                setSalesList(response.data)

            })

            .catch(function (error) {
                console.log(error);
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
                    <CustomDateRangePicker
                        onChange={handleDateRangeChange}
                        value={dateRange}
                        label={label}
                        name={'range'}
                        rules={[{ required: true, message: 'Please select date' }]} />
                </Col>

                <Flex center gap={'20px'} W_100>
                    <Button.Primary text={'Search'} htmlType={'submit'} />
                    <Button.Danger text={'Reset'} onClick={() => onReset()} />
                </Flex>
            </Row>
        </Form>
    )
}
