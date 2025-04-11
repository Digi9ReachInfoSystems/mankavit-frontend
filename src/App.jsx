import { useState } from 'react'
import styled,{ ThemeProvider} from 'styled-components'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import GlobalStyle from './theme/GlobalStyle'
import theme from './theme/Theme'
import './App.css'
import BaseLayout from './component/BaseLayout/BaseLayout'
import Dashboard from './module/admin/Dashboard/Dashboard'
import Homepage from './module/admin/Homepage/Homepage'

function App() {

  return (
   <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />
      <Routes >
        <Route path="/" element={<BaseLayout />} >
       
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/homepage' element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
   </ThemeProvider>
  )
}


export default App
