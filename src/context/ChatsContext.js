// AuthContext.js

import React, { createContext, useEffect, useReducer } from 'react';
import { reducer } from './ChatsReducer';

export const ChatContext = createContext();

const initialState = {
  chatId: null,
  chat:{},
  other_user:{}
};


  

export const ChatProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>
  {
    // localStorage.setItem("user", JSON.stringify(state.user))
  },
  []
  )
  return (
    <ChatContext.Provider value={{ data, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
