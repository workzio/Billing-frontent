import { Col, Form } from 'antd';
import { useState } from 'react'
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker';
import Input from '../../../../../Components/Form/Input';
import { InputNumber } from '../../../../../Components/Form/InputNumber';
import { Select } from '../../../../../Components/Form/Select';
import { TextAreas } from '../../../../../Components/Form/TextArea';
import { Row } from '../../../../../Components/Row';

const Formstocks = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleOnChange = (date) => {
        setSelectedDate(date);
    };
    const options = [
        { label: 'Nagercoil', value: 'nagercoil' },
        { label: 'Marthandam', value: 'marthandam' },
        { label: 'Kaliyakavillai', value: 'kaliyakavillai' },
        { label: 'Thcukalay', value: 'thcukalay' },
        { label: 'Parasala', value: 'parasala' },
    ]
    const optioned = [
        { label: 'By track', value: 'by_track' },
        { label: 'By Road', value: 'by_road' }, 
    ]
    return (
        <div>
            <Form
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

                <Row gutter={[24, 24]} style={{ backgroundColor: 'white', padding: '25px' }}>
                    <Col span={24} md={12}>
                        <Input label={'Company Name'} placeholder={'ID'} name={'compy_id'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomDatePicker
                            label={'Date'}
                            name={'selected_date'}
                            onChange={handleOnChange}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Date!',
                                }
                            ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <TextAreas label={'Address'}  name={'address'} />
                    </Col>
                    <Col span={24} md={12}>
                        <InputNumber label={'Order Number'} placeholder={'Order Number'} name={'Order_number'} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Contact'} placeholder={'Number'} name={'phnnumber'}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }} />
                     
                    </Col>
                    <Col span={24} md={12}>
                    <Input label={'GSTIN / UID'} placeholder={'GSTIN / UID'} name={'gstin'} />
                        </Col>
                   
                    <Col span={24} md={12}>
                        <InputNumber label={'Pin Code'} name={'pin_code'} placeholder={"Pin Code"} />
                    </Col>
                    <Col span={24} md={12}>
                        <Select label={'Land Mark'} options={options} />
                    </Col>
                    <Col span={24} md={12}>
                        <Select label={'Services'} options={optioned}/>
                    </Col>
                    <Col span={24} md={12}>
                        <InputNumber label={'Amount'} placeholder={'Amount'} name={'amount'} />
                    </Col>

                    <Flex  center >
                        <Button.Success text={'Save Details'}></Button.Success>&nbsp;
                        <Button.Danger text={'Cancel'}></Button.Danger>&nbsp;
                    </Flex>
                </Row>
            </Form>
        </div>
    )
}

export default Formstocks