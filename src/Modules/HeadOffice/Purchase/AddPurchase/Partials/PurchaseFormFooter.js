import { Card, Col, Form } from 'antd'
import React, { Fragment } from 'react'
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber'
import { Row } from '../../../../../Components/Row'
import { TextAreas } from '../../../../../Components/Form/TextArea'
import Checkbox from '../../../../../Components/Form/Checkbox'
import Flex from '../../../../../Components/Flex'
import { Select } from '../../../../../Components/Form/Select'


export const PurchaseFormFooter = ({ BalanceOnChange, setReceivedRow, TotalBalance, setRoundDecimalValue, RoundOffChecked, round, footerCalData, setSaleorder, tableSecondaryData }) => {

    const CusData = [
        {
            label: 'Cash',
            value: 'Cash'
        },
        {
            label: 'Cheque',
            value: 'Cheque'
        },
        {
            label: 'Online Transaction',
            value: 'Online Transaction'
        },
    ]


    const handleRoundChecked = (e) => {
        RoundOffChecked(e.target.checked)
        const num = tableSecondaryData[0].total_amount;
        const newInteger = parseInt(num);
        const newDecimal = (num - newInteger).toFixed(2).substr(1);
        setRoundDecimalValue(newDecimal);
    }


    return (
        <Fragment>
            <Row gutter={[24, 24]} >
                <Col lg={10} md={12} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Select label={'Payment Type'} options={CusData} rules={[
                                {
                                    required: true,
                                    message: 'This is a required field'
                                },

                            ]}
                                placeholder={'Payment Type'}
                                name={'payment_type'}
                            />
                        </Col>
                        <Col span={24}>
                            <TextAreas
                                label={'Description'}
                                placeholder={'Description'}
                                name={'description'}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col lg={4} md={0} span={0}></Col>

                <Col lg={10} md={12} span={24}>
                    <Card>
                        <Row gutter={[12, 12]}>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Quantity'}
                                    name={'total_qty'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>

                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Tax'}
                                    name={'total_tax'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>

                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Price'}
                                    name={'total_price'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>

                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Amount'}
                                    name={'total_amount'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col lg={8} md={4} span={0}></Col>

                <Col lg={16} md={20} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Row gutter={[12, 12]}>
                                <Col sm={12} span={24} style={{
                                    display: 'flex',
                                    alignItems: 'end',
                                }}>
                                    <Row gutter={[12, 12]}>
                                        <Col lg={16} span={12}>
                                            <Checkbox label={'Round Off'} name={'round_off_status'} onChange={handleRoundChecked} />
                                        </Col>

                                        <Col lg={8} span={12}>
                                            <CustomInputNumber precision={2} name={'roundoff'} placed={'end'} disabled />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={12} span={24}>
                                    <CustomInputNumber precision={2} name={'roundoff_amount'} label={'Total'} placed={'end'} disabled />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                           
                        </Col>
                        <Col span={24}>
                            <Row gutter={[12, 12]}>
                                <Col sm={12} span={0}></Col>

                                <Col sm={12} span={24}>
                                    <CustomInputNumber precision={2} name={'balance'} label={'Balance'} disabled placed={'end'} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col >
            </Row >
            <Flex flexEnd gap={'10px'}>


            </Flex>
        </Fragment>
    )
}

