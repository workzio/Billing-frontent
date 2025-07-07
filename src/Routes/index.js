
import React from 'react'
import AuthRouter from './Components/AuthRouter'
import { Routes, Route } from 'react-router'

const Routers = ({ token, cartList }) => {
  const isAuthenticated = Boolean(token)
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <AuthRouter isAuthenticated={isAuthenticated} cartList={cartList} />
        }
      />
    </Routes>
  )
}

export default Routers
