import {React, useState, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

import { AttachFileOutlined } from '@mui/icons-material'
import { ImageOutlined } from '@mui/icons-material'
import { sendMessage } from '../../services/api/DataApi'
import { ChatContext } from '../../context/ChatsContext'




function Input() {

  const [message, setMessage] = useState ("")
  const {state} = useContext(AuthContext)

  const {data} = useContext(ChatContext)
  const handleSend = () =>
  {
     try {
      sendMessage({"message":message, "currentUserId":state.user.uid,"otherUserId":data.other_user.user_id})
      setMessage('')
     } catch (error) {
      console.log(error)
     }
  }

  return (
    <div className='chat_input'>
         <input className='text_input' value={message} type='text' placeholder='Type message here...' onChange={e=>setMessage(e.target.value)}/>
         <div className="send">
          <ImageOutlined/>
          
          <input type='file' style={{display:"none"}} id='file'/>
          <label htmlFor='file'>
            <AttachFileOutlined className='attach'/>
          </label>
          <button onClick={handleSend}>Send</button>
         </div>
    </div>
  )
}

export default Input