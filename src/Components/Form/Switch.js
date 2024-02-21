import React from 'react'
import { Switch as AntdSwitch, Form } from 'antd'
import styled, { css } from 'styled-components'
import Flex from '../Flex'

const FlexWrapper = styled(Flex)`


`;

const StyledSwitch = styled(AntdSwitch)`
  box-shadow: none !important;
  
`
const LabelWrapper = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin:auto 10px ;
`;

const Switch = ({ label2, label, name,defaultChecked, onChange,state, valuePropName, ...rest }) => {

  return (
    <Form.Item name={name} valuePropName={valuePropName} {...rest} style={{margin:'auto 0'}}>
      <FlexWrapper spaceBetween>
        <LabelWrapper state={state}>{label}</LabelWrapper>
        <StyledSwitch onChange={onChange} defaultChecked={defaultChecked} {...rest} />
        <LabelWrapper state={state}>{label2}</LabelWrapper>
      </FlexWrapper>
    </Form.Item>
  )
}

export default Switch
