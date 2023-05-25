import React, { useEffect } from 'react'


import './formStyle.scss'
import { useState } from 'react'

import { collection, addDoc,serverTimestamp } from 'firebase/firestore'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { db, auth } from '../../firebase/firebase'

export const DataContext = React.createContext()
function Signup() {

    const [data, setData] = useState(null)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail]=useState("")
    const [experience, setExperience] = useState(null)
    const [values, setValues] = useState({})
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [passwordcheck, setPasswordcheck] = useState({"error":false, "message":""})
    
  
    
    const handleChange = (e) =>
    {
  
      setData({...data, [e.target.name]: e.target.value})
      
    }
  
 
  
   
  
    const submitBtnHandler = async(e) =>
    {
     
      e.preventDefault();
      const { password, confirmpassword, ...userDetails } = data;
  
      await createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async(userCredential) => {
              // Signed in
             // const user = userCredential.user;
  
             // await user.sendEmailVerification()
  
              auth.onAuthStateChanged(async (user) => {
                if (user) {
                await sendEmailVerification(user);
                  // rest of the code for adding user to Firestore collection
              
  
              try {
                const docRef = await addDoc(collection(db, "Users"), {
                  user_id: user.uid,
                  ...userDetails,
                  timestamps:serverTimestamp()
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              console.log(user);
  
            }
          });
             // navigate("/login")
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ..
          });
   
     
  
      }
  
    
  
  
  
    useEffect(() => {
     // setData(values)
   }, [values]);
  
  
  
    return (
      
  
         <div className='form_div'>
  
          <div className="form_body">
            <form className='signupForm form' onSubmit={submitBtnHandler}>
            <span className='heading'>Signup to K2W-chart</span>
                <div className="input_group">
                  <input className='firstname'  type='field' id='firstname' name="firstname" value={data!= null? data.firstname: ""} placeholder='First name' onChange={handleChange}/>  
                  <input className='lastname' name="lastname" value={data!= null? data.lastname: ""} type='field' placeholder='Last name' onChange={handleChange}/>
                  </div>
                  <input className='email'  type='field' name='email' value={data!= null? data.email: ""} placeholder='Enter your email' onChange={handleChange}/>
                 {!passwordcheck.error && <div className="passwordError"><span>{passwordcheck.message}</span></div>}
                  <div className="input_group">
                  <input className='password'  type='password' id='password' name="password" value={data!= null? data.password: ""} placeholder='Password' onChange={handleChange}/>  
                  <input className='confirmpassword' name="confirmpassword" value={data!= null? data.confirmpassword: ""} type='password' placeholder='Confirm Password' onChange={handleChange}/>
                  </div>
              
                
  
                  <div className='buttons'>
  
   <button className='nextBtn' type='submit'>Submit</button>
  </div>
  
            </form>
          </div>
          </div>
     
    )

  
    }
export default Signup