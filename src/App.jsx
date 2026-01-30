import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login/Login';
import Block from './components/Block/Block';
import Side from './components/Side/Side';

export default function App() {
  return (
    <div>
      <Login />
      <Block />
      <Side />
    </div>
  )
}