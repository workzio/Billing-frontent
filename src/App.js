import React, { Fragment, useLayoutEffect } from 'react'
import Routers from './Routes/index'
import { useLocation } from 'react-router-dom'
import GlobalStyle from './theme/GlobalStyle';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ token }) => {
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Fragment>
      <GlobalStyle />
      <Routers token={token} />
      <ToastContainer />
    </Fragment>
  )
}

export default App
