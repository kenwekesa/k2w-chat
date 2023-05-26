import React, { useContext, useEffect, useState } from 'react'

import { MoreVertOutlined } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'

import { findUser } from '../../services/api/DataApi'



function Chatsnavbar() {

  const {state} = useContext(AuthContext)
  const [currentuser, setCurrentuser] = useState(null)


  

  return (
    <div className='chats_navbar'>
        <div className='nav_logo'><span>Chats</span> </div>
        <div className='user_wrapper'>
            <div className="user">
             {state.user_details? <span>{state.user_details.firstname}</span>:""}
            <img className='profile_pic' src={require('../../images/dummyuser.webp')} alt='Image'/>
                <MoreVertOutlined className='options'/>
            </div>
        </div>
    </div>
  )
}

export default Chatsnavbar