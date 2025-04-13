import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/login';
import Register from './pages/Register';
import Home from './components/Home';
import Dashboard from './pages/Dashboard';
import AddProperty from './pages/AddProperty';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  </Router>
  )
}

export default App