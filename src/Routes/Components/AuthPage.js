import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Page from '../../Modules/Page/Container/index'
import { adminAuthenticated } from '../config/user'
import Flex from '../../Components/Flex'
import styled from 'styled-components'

const PageFlex = styled(Flex)`
  overflow: hidden;
`
const AuthPage = ({ isAuthenticated }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin')
    }
  }, [isAuthenticated])

  return (
    <PageFlex>
      {isAuthenticated && (
        <>
          <Page>
            <Routes>
              {adminAuthenticated.map(({ routePath, Component }) => {
                return (
                  <Route
                    key={routePath}
                    path={routePath}
                    element={<Component />}
                  ></Route>
                )
              })}
            </Routes>
          </Page>
        </>
      )}
    </PageFlex>
  )
}

export default AuthPage
