import { Col, Collapse } from 'antd'
import React from 'react'
import { DashboardData } from '../../../Assets/DashboardData'
import Flex from '../../../Components/Flex'
import { Row } from '../../../Components/Row'
import { Cards } from '../style'
import { useEffect } from 'react'
import request from '../../../utils/request'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cardboard = () => {

    const [dashboardData, setDashboardData] = useState(DashboardData);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend and update state
        fetchData();
    }, []);

    const fetchData = () => {
        request.get('dashboard/report')
            .then(function (response) {
                const data = response.data;
                setDashboardData((prevData) =>
                    prevData.map((item) => {
                        switch (item.h1) {
                            case 'Total Sales':
                                return {
                                    ...item,
                                    Total: data.sale_count.toString() || 0,
                                };
                            case 'Total Purchase':
                                return {
                                    ...item,
                                    Total: data.purchase_count.toString() || 0,
                                };
                            case 'Total Stocks':
                                return {
                                    ...item,
                                    Total: data.stock.toString() || 0,
                                };
                            case 'Total Distributors':
                                return {
                                    ...item,
                                    Total: data.customer.toString() || 0,
                                };
                            default:
                                return item;
                        }
                    })
                );
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    };

    const Goto = (nav) => {
        navigate(nav.navigate)
    }

    return (
        <div style={{ marginTop: '50px' }}>
            <Row gutter={[16, 16]} >
                {dashboardData.map(({ h1,icon, Total, navigate }, i) => {
                    return (
                        <Col span={24} xs={24} sm={12} md={12} lg={6} key={i} >
                            <div onClick={() => Goto({ navigate })}>
                                <Cards>
                                    <Flex spaceBetween>
                                            {icon}
                                            <h1>{h1}</h1>
                                    </Flex>
                                    <Flex >
                                        <h4>{Total}</h4>
                                    </Flex>
                                </Cards>
                            </div>
                        </Col>
                    )
                })}
            </Row>

        </div>
    )
}

export default Cardboard
