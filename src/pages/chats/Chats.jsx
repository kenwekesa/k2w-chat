import React from 'react'
import './chats.scss'
import Sidebar from '../../components/chats/Sidebar'
import Chatsbar from '../../components/chats/Chatsbar'

function Chats() {
  return (
    <div className='chats'>
        <Sidebar/>
        <Chatsbar/>
    </div>
  )
}

export default Chats