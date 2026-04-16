import { useState } from 'react'
import { Route,Routes,useNavigate } from 'react-router-dom'
import { getToken } from './Utils/auth'
import { useEffect } from 'react'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import DispBookmark from './Components/DispBookmark'

function App() {
   const navigate=useNavigate();
useEffect(()=>{
  const token=getToken();
  if(!token){
    navigate('/');
  }

},[])

  return (
    <>
      <Routes>
        <Route>
          
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/' element={<Login/>}></Route>
           <Route path='/dashboard' element={<Dashboard/>}></Route>
           <Route path='/DispBookmark' element={<DispBookmark/>}></Route>
        </Route>
      </Routes>
      
    </>
    
  )
}

export default App
