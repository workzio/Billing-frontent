
import React from 'react'
import styled from 'styled-components'
import { Checkbox as AntdCheckbox, Form } from 'antd'

const StyledCheckbox = styled(AntdCheckbox)`
  & .ant-checkbox .ant-checkbox-inner {
    width: 18px;
    height: 18px;
    /* background: ${props => props.color || 'black'}; */

    &:hover {
      /* background: ${props => props.color || 'black'}; */
      /* border-color: ${props => props.color || 'black'}; */
    }
  }
  & .ant-checkbox .ant-checkbox-inner:after {
    inset-inline-start: 25%;
  }
  &.ant-checkbox-wrapper {
    align-items: center;
    height: 100%;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    /* background-color: ${props => props.color || 'black'}; */
    /* border-color: ${props => props.color || 'black'}; */
  }
  .ant-checkbox + span {
    padding-left: 12px;
  }
`
const LabelWrapper = styled.div`
  font-size: 16px;
  line-height: 24px;
  /* color: #202020; */
`

const Checkbox = ({ onChange, label, checked, name, color,  ...rest }) => {

   return (

    <Form.Item name={name} valuePropName="checked" style={{marginBottom:'0'}}>
      <StyledCheckbox
        {...rest}
        checked={checked}
        color={color}
        onChange={onChange}
      >
        <LabelWrapper>{label}</LabelWrapper>
      </StyledCheckbox>
    </Form.Item>
  )
}
export default Checkbox