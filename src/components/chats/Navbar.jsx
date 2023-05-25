import React, { useContext, useEffect, useState } from 'react'

import { MoreVertOutlined } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'

import { findUser } from '../../services/api/DataApi'



function Chatsnavbar() {

  const {state} = useContext(AuthContext)
  const [currentuser, setCurrentuser] = useState(null)

  const user = findUser(state.user.uid)


  return (
    <div className='chats_navbar'>
        <div className='nav_logo'><span>Chats</span> </div>
        <div className='user_wrapper'>
            <div className="user">
            <img className='profile_pic' src={require('../../images/dummyuser.webp')} alt='Image'/>
                <MoreVertOutlined className='options'/>
            </div>
        </div>
    </div>
  )
}

export default Chatsnavbar