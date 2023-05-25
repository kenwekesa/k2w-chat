import React from 'react'
import Chatsnavbar from './Navbar'
import Search from './Search'
import Userchats from './Userchats'

function Sidebar() {
  return (
    <div className='chats_sidebar'>
        <Chatsnavbar/>
        <Search/>
        <hr/>
        <Userchats/>
    </div>
  )
}

export default Sidebar