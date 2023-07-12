import React, { useContext, useState } from 'react'
import { findUserByName } from '../../services/api/DataApi'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatsContext'

function Search() {

  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(false)

  const {state, dispatch} = useContext(ChatContext)

  

  const handleSearch =async() => 
  {
    //
    

    try{

      console.log(username)
      const res = await findUserByName(username)

      setUsers(res)

      console.log(users)
      
      
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

  const handleSelect = (user) => {
    // dispatch({ type: 'CHANGE_CHAT', payload: chat });
     dispatch({ type: 'UPDATE_OTHER_USER', payload: user }); 
    console.log(user)
  
  };


  return (
    <div className='chat_search'>

        <div className='search_form'>
            <input type='text' placeholder='Find the chat' onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        {users?.map(user=> 
        (

          <div className="user_chat" key={user.user_id} onClick={()=>handleSelect(user)}>
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