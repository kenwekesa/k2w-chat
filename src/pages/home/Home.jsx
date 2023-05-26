import React, { useEffect, useState } from 'react'

import { findUser } from '../../services/api/DataApi'

import { AuthContext } from '../../context/AuthContext'

function Home() {

  const [currentuser, setCurrentuser] = useState(null)

  const {state, dispatch} = useContext(AuthContext)



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
    <div>Home</div>
  )
}

export default Home