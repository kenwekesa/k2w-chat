import React, { useContext, useEffect, useState } from 'react'

import './home.scss'
import { findUser } from '../../services/api/DataApi'

import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [currentuser, setCurrentuser] = useState(null)

  const {state, dispatch} = useContext(AuthContext)

  const navigate = useNavigate()



  const fetchData = async () => {
    
    try{

  
    const res = await findUser(state.user.uid)


    //setUsers([...res])
    setCurrentuser(res[0])
    console.log(res)
    }
    catch(error)
    {
      console.log(error)
    }
    
}


useEffect(() => {
    fetchData()
}, [])


useEffect(()=>
{
  dispatch({type:'UPDATE_USER_DETAILS', payload: currentuser})
  

},[currentuser])


  return (
    <div className='home'>
       <div className="home_container">
          <div className="chat_btn" onClick={()=>navigate('/chats')}>Go to chats</div>
        </div> 
    </div>
  )
}

export default Home