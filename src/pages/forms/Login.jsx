import React, { useContext } from 'react'
import { useState } from 'react'
import './formStyle.scss'
import { auth } from '../../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import Formnav from '../../components/formNavbar/Formnav'
import { AuthContext } from '../../context/AuthContext'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleLogin = () => 
  {
    //handle login here

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>
    {
      const user = userCredential.user
      console.log(user)
     dispatch({type:"LOGIN", payload:user})
      navigate('/')
    })
    .catch((error)=>
    {
      console.log(error)
    })
  }
  return (
    <div className='form_div'> 
        <Formnav/>
        <div className="form_body">
          <form className='loginForm form'>
          <span className='heading'>Login here</span>
              <input className='username'  type='field' placeholder='Enter your email'
               onChange={(e)=>setEmail(e.target.value)}
              />
              <input className='pass' type='password' placeholder='Enter your password'
              onChange={(e)=>setPassword(e.target.value)}
              />
              <span className='link_span'>I forgot my password</span>
              <div className='loginBtn btn' onClick={handleLogin}>Login now</div>
          </form>
        </div>
        </div>
  )
}

export default Login