import { Col } from 'antd'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { SearchBar } from '../../../../../Components/Form/SearchBar'
import { Row } from '../../../../../Components/Row'
import { Table } from '../../../../../Components/Table'
import { HeadCon } from './style'
import { TopBox } from '../../../Stocks/Style'
import { TopTitle } from '../../../../../Components/Form/TopTitle'


const HeadofceAdmin = () => {
    const nevigate = useNavigate();
    const columns = [
        {
            title: 'Stocks Availabilty',
            dataIndex: 'stocks_availability',


        },
        {
            title: 'Total Amount',
            dataIndex: 'total Amount',

        },
        {
            title: 'Workers Salary',
            dataIndex: 'total_salary',

        },
        {
            title: 'No of Workers',
            dataIndex: 'workers',

        },
        {
            title: 'No of Products Delivered',
            dataIndex: 'products_delivered',
        },

        {
            title: 'Balance',
            dataIndex: 'balance',

        },
    ]
    return (
        <div>
            <HeadCon>
                <TopTitle Heading={'Head Office'} />
                <TopBox>
                    <Row style={{ padding: '22px 70px' }}>
                        <Col span={24} lg={6}>
                            <SearchBar width={200} />
                        </Col>
                        <Col span={24} lg={6}>
                        </Col>
                        <Col span={24} lg={6}>
                        </Col>
                        <Col span={24} lg={6}>
                            <Flex end gap={'50px'}>
                                <Button.Yellow text={'ADD'} onClick={()=>nevigate('/StockTable')}/>
                            </Flex>
                        </Col>
                    </Row>
                </TopBox>
                <Table columns={columns} />
            </HeadCon>
    <Outlet/>
        </div>
    )
}

export default HeadofceAdmin