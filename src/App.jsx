import { useState } from 'react'


import './App.css'
import Header from './component/header'
import LoginComponent from './pages/loginPage/login'
import RegisterComponent from './pages/registerPage/register'
import SignUpProvider from './context/setToken'

function App() {
  return (
    <>
      <div className='back'>

        {/* <Header></Header> */}
        {/* <LoginComponent></LoginComponent> */}
        <SignUpProvider>

          <LoginComponent></LoginComponent>

        </SignUpProvider>
      </div>
    </>
  )
}

export default App


