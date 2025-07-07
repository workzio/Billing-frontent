import React from 'react'
import Button from '../../../Components/Form/Button'
import styled from 'styled-components'
import { Form, Input } from 'antd'


const Label = styled.h2`
color:#fff;
font-size:1.4rem;
`


const SignInForm = ({ handleSignIn }) => {

  const [form] = Form.useForm();

  const onFinish = values => {
    form.resetFields();
    handleSignIn(values)
  }

  return (

    <Form
      name="basic"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label={<Label>User Name</Label>}
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input size="large" placeholder="UserName"/>
      </Form.Item>

      <Form.Item
        label={<Label>Password</Label>}
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder="Password"size="large"/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button.Primary text={'Login'} width={'390px'} htmlType="submit" />

      </Form.Item>
    </Form>
  )
}

export default SignInForm
