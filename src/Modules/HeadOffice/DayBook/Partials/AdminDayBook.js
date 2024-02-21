import React, { useState } from 'react'
import { Table } from '../../../../Components/Table'
import { Row } from '../../../../Components/Row'
import { Card, Col, Form } from 'antd'
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { useEffect } from 'react'
import request from '../../../../utils/request'

export const AdminDayBook = () => {

    const [columnData, setColumnData] = useState([])

    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Sl.No',
            render: (value, item, index) => index + 1,
            key: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'id',
        },
        {
            title: 'Bill No',
            dataIndex: 'billNumber',
            key: 'id',
        },
        {
            title: 'Particulars',
            key: 'id',
            dataIndex: 'particulars',
        },
        {
            key: 'id',
            title: 'Amount',
            children: [
                {
                    title: 'Credit',
                    dataIndex: 'credit',
                },
                {
                    title: 'Debit',
                    dataIndex: 'debit',
                },
            ]
        },

    ]
    const GetDaybook = () => {
        request.get('daybook/filter')
            .then(function (response) {
                setColumnData(response?.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        GetDaybook();
    }, [])

    let totalDebit = 0;
    let totalCredit = 0;

    columnData.forEach(transaction => {
        totalDebit += transaction.debit || 0;
        totalCredit += transaction.credit || 0;
    });



    const data={
        total_credit:totalCredit,
        total_debit:totalDebit
    }

        useEffect(() => {
            form.setFieldsValue(data)
        }, [columnData])

    return (
        <div>
            <TopTitle Heading={'Day Book'} />
            <Table columns={columns} data={columnData} />
            <br />
            <br />
            <Row gutter={[24, 24]} >
                <Col lg={10} md={12} span={24}>
                </Col>

                <Col lg={14} md={12} span={24}>
                    <Card>
                        <Form name="Daybook"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            form={form}
                        >
                            <Row gutter={[12, 12]}>
                                <Col span={24} lg={12}>
                                    <CustomInputNumber precision={2}
                                        label={'Total Credit Amount'}
                                        name={'total_credit'}
                                        placed={'end'}
                                        disabled
                                    />
                                </Col>
                                <Col span={24} lg={12}>
                                    <CustomInputNumber precision={2}
                                        label={'Total Debit Amount'}
                                        name={'total_debit'}
                                        placed={'end'}
                                        disabled
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col lg={8} md={4} span={0}></Col>
            </Row >
        </div>
    )
}

