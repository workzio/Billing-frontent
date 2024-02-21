import React, { useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../../../Components/Flex'
import SignInForm from './SignInForm'
import { useNavigate } from 'react-router-dom'

export const Wrapper = styled(Flex)`
  height: 100vh;
  width: 100%;
  // background-color: #f6f6f6;
  background-image: linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% );
  display:flex;
  align-items:center;
  justify-content:center;
`

const SignInCard = styled.div`
  background-color: rgba(0,0,0,0.5);
  padding: 40px 32px;
  border-radius:10px;
  max-width: 450px;
  width: 100%;
  // margin: auto;
  box-shadow: 0px 2px 10px rgba(99, 116, 135, 0.2);
`

const Title = styled.h1`
  color:#fff;
  font-size:3rem;
  margin-bottom:1rem;
  text-align:center;
  font-variant: small-caps;
  letter-spacing:1px;
`

const UserSignin = ({ token, SignIn }) => {
  const navigate = useNavigate()

  const handleSignIn = data => {
    SignIn(data)
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <Wrapper column>
        <Title>Biz Flow</Title>

      <SignInCard>
        <Title>Login</Title>
        <SignInForm handleSignIn={handleSignIn} />
      </SignInCard>
    </Wrapper>
  )
}
export default UserSignin
