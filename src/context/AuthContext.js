// AuthContext.js

import React, { createContext, useEffect, useReducer } from 'react';
import { reducer } from './AuthReducer';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
};


  

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>
  {
     localStorage.setItem("user", JSON.stringify(state.user))
  },
  [state.user]
  )
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
