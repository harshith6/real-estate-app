import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import AddOwner from './pages/AddOwner';
import AddProperty from './pages/AddProperty';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/login';
import Profile from './pages/Profile';
import Register from './pages/Register';

// Components
import { UserProvider } from './pages/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-owner" element={<AddOwner />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;