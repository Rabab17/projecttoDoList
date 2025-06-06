import { useState } from 'react'


import './App.css'
import Header from './component/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className='back'>

  <Header></Header>
</div>
    </>
  )
}

export default App


