import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    // Try to load user from localStorage on first render
    id: null,
    email: null,
    name: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};