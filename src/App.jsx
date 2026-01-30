import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login/Login';
import Block from './components/Block/Block';
import Side from './components/Side/Side';
import MainPage from './pages/MainPage';
import { Route, Routes, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      {/* <Link to="/login"><h1>Login</h1></Link>
      <Link to="/pages"><h1>Pages</h1></Link> */}
      <Routes>
        <Route path="/login" element= {<Login />} />
        <Route path="/pages" element= {<MainPage />} />
      </Routes>
    </div>
  )
}