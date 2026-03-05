import React from 'react';
import './index.css';
import Login from './pages/Login/Login';
import Block from './components/Block/Block';
import Side from './components/Side/Side';
import MainPage from './pages/MainPage';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './root.css';
import GSAP from './pages/GSAP-test/GSAPBlock';
import Switch from './pages/Switch-test/switch';

export default function App() {
  const navigate = useNavigate()
  const [ user, setUser ] = useState({})
  useEffect(() => { // Login
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
  
  }, [])

  return (
    <div>
      {/* <Link to="/login"><h1>Login</h1></Link>
      <Link to="/pages"><h1>Pages</h1></Link> */}
      <Routes>
        <Route path="/login" element= {<Login />} />
        <Route path="/pages/*" element= {<MainPage authentication={user} />} />
        <Route path="/test-masking" element= { <GSAP /> } />
        <Route path="/test-switch" element= { <Switch /> } />
      </Routes>
    </div>
  )
}