import React, { useState } from 'react'
import { Row } from '../../../../Components/Row'
import { Col, Form } from 'antd'
import Input from '../../../../Components/Form/Input'
import { InputNumber } from '../../../../Components/Form/InputNumber'
import { Select } from '../../../../Components/Form/Select'
import Flex from '../../../../Components/Flex'
import Button from '../../../../Components/Form/Button'
import { CustomDatePicker } from '../../../../Components/Form/CustomDatePicker'
import Upload from '../../../../Components/Form/Upload'
import Label from '../../../../Components/Form/Label'
import { PlusOutlined } from '@ant-design/icons'
import { TopTitle } from '../../../../Components/Form/TopTitle'


const DeliveryForm = () => {

    const [files, setFiles] = useState(null)
    const SelectedImg = (arg) => {
        setFiles(arg)
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

const options=[
    {
    label:'By Road',
    value:'by_road'
},

{
    label:'By Train',
    value:'by_train'
},

]


const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};




  return (
    <div style={{ margin: '0 auto', width: '95%' }}>
        <TopTitle Heading={'Delivery Status'} /> 
        <Form 

         labelCol={{
            span: 24,
        }}
        wrapperCol={{
            span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
     >
            <Row gutter={[12,12]} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                <Col span={24} md={12}>
                    <Input label={'Order ID :'} placeholder={'Order ID'}/>
                    <InputNumber label={'Bill Number :'} placeholder={'Bill Number'}/>
                    <Input label={'Company Name :'} placeholder={'Order ID'}/>
                    <Select label={'Travel Type'} options={options}/>
                    <Input label={'Travel Name :'} placeholder={'Travel Name'}/>
                    <InputNumber label={'Travel Contact Number :'} placeholder={'Travel Contact Number'}/>
                    <Input label={'Destination Location :'} placeholder={'Destination Location'}/>
                    <Label>Bill Upload :</Label>
                    <Upload SelectedImg={SelectedImg}
                            label={'Profile Photo'}
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required field'
                                },

                            ]}
                            name={'img'}
                            link={'http://127.0.0.1:8000/api/my_testing/'}
                            maxCount={1}
                            listType={'picture-card'}
                            files={files}
                        />
                    <InputNumber label={'Amount'} placeholder={'Amount'}/>
                    <br />
                    <Flex spaceAround><br /><br />
                        <Button.Primary text={'Save'} htmlType={'submit'}></Button.Primary>
                        <Button.Danger text={'Cancel'}></Button.Danger>
                    </Flex>


                </Col>

                <Col span={24} md={12}>
                <CustomDatePicker label={'DATE : '
                } name={'date'}
                onChange={handleOnChange}/>
                    <InputNumber label={'Contact :'} placeholder={'Contact'}/>
                    <InputNumber label={'PNR Number :'} placeholder={'PNR Number'}/>
                    <Input label={'Designation Location :'} placeholder={'Designation Location'}/>
                    <InputNumber label={'Amount : '} placeholder={'Amount'}/>
                    <Label>Bill Upload :</Label>
                    <Upload SelectedImg={SelectedImg}
                            label={'Profile Photo'}
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required field'
                                },

                            ]}
                            name={'img'}
                            link={'http://127.0.0.1:8000/api/my_testing/'}
                            maxCount={1}
                            listType={'picture-card'}
                            files={files}
                        />
                </Col>

            </Row>
        </Form>
    </div>
  )
}

export default DeliveryForm
