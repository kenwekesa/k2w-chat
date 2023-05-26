import React, { useState } from 'react'
import { findUserByName } from '../../services/api/DataApi'

function Search() {

  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(false)

  const handleSearch =async() => 
  {
    //
    

    try{

      console.log(username)
      const res = await findUserByName(username)

      setUsers(res)
      
      
    }
    catch(error)
    {
      setError(true)
      console.log(error)
    }
  }
  const handleKey =(e)=> 
  {
    
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = (chat, user_details) => {
    dispatch({ type: 'CHANGE_CHAT', payload: chat });
    dispatch({ type: 'UPDATE_OTHER_USER', payload: user_details });  };


  return (
    <div className='chat_search'>

        <div className='search_form'>
            <input type='text' placeholder='Find the chat' onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        {users.map(user=> 
        (

          <div className="user_chat">
            <img className='profile_pic' src={require('../../images/dummyuser.webp')} alt='Image'/>
            <div className="user_chat_info">
                <span>{user.firstname} {user.lastname} </span>
            </div>
        </div>
          ))
}

    
    </div>
  )
}

export default Search