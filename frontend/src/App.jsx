import React from 'react';
import './index.css';
import Login from './pages/Login/Login';
import Block from './components/Block/Block';
import Side from './components/Side/Side';
import MainPage from './pages/MainPage';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './root.css';
import GSAP from './pages/GSAP-test/GSAPBlock';
import Switch from './pages/Switch-test/switch';


export default function App() {
  const navigate = useNavigate()
  const [ user, setUser ] = useState({})
  const [loading, setLoading] = useState(true)

  /*useEffect(() => { // Login
    async function aut() {
      const res = await fetch('https://stockmight-backend.onrender.com/api/users/me', {
        method: 'GET',
        credentials: 'include'
      })
      const data = await res.json()
      if (res.status == 401) {
        console.log("401 : " + data)
        navigate('/login')
      }
      if (res.ok) {
        console.log("200 : " + data)
        setUser(data)
      }
    }
  aut()
  
  }, [])*/

  useEffect(() => {
  async function aut() {
    try {
      const res = await fetch('https://stockmight-backend.onrender.com/api/users/me', {
        method: 'GET',
        credentials: 'include'
      })

      const data = await res.json()

      if (res.status === 401) {
        navigate('/login')
      }

      if (res.ok) {
        setUser(data)
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  aut()

}, [navigate])

  if (loading) { 
    return ( 
    <div className="loading-screen"> 
    <img src="/Logo/StockMight_Color_Hor.svg" width="200"/> 
    <div className="spinner"></div><p>กำลังเปิดประตูคลังสินค้า...</p></div> 
    ) 
  }

  return (
    <div>
      {/* <Link to="/login"><h1>Login</h1></Link>
      <Link to="/pages"><h1>Pages</h1></Link> */}
      <Routes>
        <Route path="/" element={ user?.user ? <Navigate to="/pages/home" /> : <Navigate to="/login" /> } />
        <Route path="/login" element= {<Login />} />
        <Route path="/pages/*" element= {<MainPage authentication={user} />} />
        <Route path="/test-masking" element= { <GSAP /> } />
        <Route path="/test-switch" element= { <Switch /> } />
      </Routes>
    </div>
  )
}