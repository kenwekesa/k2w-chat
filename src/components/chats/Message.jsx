import React, { useContext } from 'react'

import { ChatContext } from '../../context/ChatsContext'

function Message({owner, messages}) {

  const {data} = useContext(ChatContext)
  console.log(messages)
  return (
    <div className={`message  ${owner}`}>

       
        <div className={`text ${owner}`}>
          {messages &&
          <>
          <p>{messages.message}</p>
             <div className="time_stamp">4:00 am</div>
          </>
}
          </div>
      
      </div>
  )
}

export default Message