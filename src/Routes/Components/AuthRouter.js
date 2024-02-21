import React, { Fragment } from 'react'
import AuthPage from './AuthPage'
import { Routes, Route } from 'react-router-dom'
import { anonymous } from '../config/user'

const AuthRouter = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Routes>
        {anonymous.map(({ routePath, Component }) => {
          return (
            <Route
              key={routePath}
              path={routePath}
              element={<Component />}
            ></Route>
          )
        })}
      </Routes>
      <AuthPage isAuthenticated={isAuthenticated} />
    </Fragment>
  )
}

export default AuthRouter
