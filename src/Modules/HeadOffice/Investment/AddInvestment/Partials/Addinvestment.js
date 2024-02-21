import { Col } from 'antd'
import React from 'react'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker'
import Input from '../../../../../Components/Form/Input'
import { Row } from '../../../../../Components/Row'
import Label from '../../../../../Components/Form/Label'

const Addinvestment = () => {
    return (
        <>
            <Row >
                <Col span={24} lg={12}  >
                    <Label> Date</Label>
                    <CustomDatePicker width={220} />
                </Col>
                <Col span={24} lg={11}>
                    <Flex end>
                        <Input
                            label={'Investment Amount :'}
                            name={'amount'}
                            width={300}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Investment Amount!',
                                },

                            ]} />
                    </Flex>

                </Col>
            </Row>
            <Flex flexStart gap={'10px'} style={{ margin: '50px 0px' }}>
                <Button.Success text={'Save'} htmlType={'submit'} />
                <Button.Danger text={'Cancel'} htmlType={'cancel'} />
            </Flex>

        </>
    )
}

export default Addinvestment