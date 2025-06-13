import { useState } from 'react'
import './App.css'
import Header from './component/header'
import LoginComponent from './pages/loginPage/login'
import RegisterComponent from './pages/registerPage/register'
import SignUpProvider from './context/setToken'
import Layout from './layout/layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children: [
      { index: '/', element: <Header /> },
      { path: 'login', element: <LoginComponent /> },
      { path: 'register', element: <RegisterComponent /> }
    ]
  }])
  return (
    <>
      <div className='back'>

        <SignUpProvider>

          <RouterProvider router={router} />

        </SignUpProvider>
      </div>
    </>
  )
}

export default App


