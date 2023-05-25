import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'

import { ChatContext } from '../../context/ChatsContext';
import { AuthContext } from '../../context/AuthContext';

import { where, onSnapshot,collection, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

function Messages() {

  const {data, dispatch} = useContext(ChatContext)
  const {state} = useContext(AuthContext)

  const [messages, setMessages] = useState([])


  useEffect(() => {
    if(data.chat.id!=undefined)
    {
    const q = query(collection(db, "messages"), where("conversation_id", "==", data.chat.id));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const message = doc.data().message;
    setMessages(message);
    console.log(message);
  } else {
    console.log("No matching documents found");
    // Handle the case when no document matches the conditions
  }
});

return () => {
  dispatch({type:"RESET_DATA"})
};



  }
  else {
   console.log("No data yet")}}, [data.chat.id]);
   

  return (
    <div className='messages'>
      {messages.map(message =>
        <Message owner={message.senderId === state.user.uid? "owner":""} messages ={message}/>
        )}
       
     
    </div>
  )
}

export default Messages