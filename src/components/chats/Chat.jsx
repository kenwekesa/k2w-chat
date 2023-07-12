import { MoreVertOutlined } from '@mui/icons-material'
import React, { memo, useContext, useEffect } from 'react'
import Messages from './Messages'
import Input from './Input'

import { ChatContext } from '../../context/ChatsContext'

function Chat() {

  const {data} = useContext(ChatContext)

  
  useEffect(() => {
    console.log(data);
    console.log("something")
  }, [data]);

  return (
    <div className='chat'>
        <div className="chat_info">
            {data!=null &&<span>{data.other_user.firstname} {data.other_user.lastname}</span>}
            <div className="chat_icons">
                <MoreVertOutlined/>
            </div>
        </div>
        <Messages/>
        {data.other_user.user_id &&
        <Input />}
    </div>
  )
}

export default memo(Chat)