import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import GlobalStyle from './theme/GlobalStyle'
import theme from './theme/Theme'
import './App.css'
import BaseLayout from './component/BaseLayout/BaseLayout'
import Dashboard from './module/admin/Dashboard/Dashboard'
import Homepage from './module/admin/Homepage/Homepage'
import Login from './pages/Login/Login'
import OtpLogin from './pages/OtpLogin/OtpLogin'
import Test from './pages/Test/Test'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/loginOtp" element={<OtpLogin />} />


          <Route path="/user" element={<Test />} >
          </Route>




          <Route path="/admin" element={<BaseLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="homepage" element={<Homepage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}


export default App
