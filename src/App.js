import logo from './logo.svg';
import './App.css';

import Login from './pages/forms/Login';
import Signup from './pages/forms/Signup';

import Chats from './pages/chats/Chats';
import { AuthContext } from './context/AuthContext';


import { Route,Routes, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Confirmmail from './pages/forms/Confirmmail';
import Needverification from './pages/need_approval/Needverification';


const RequireAuth =({children}) => 
{
  
  const {state} = useContext(AuthContext)
   return state.user? children: <Navigate to='/login'/>
}

const RequireEmailVerification =({children}) => 
  {
    const navigate = useNavigate();
   const { state, dispatch } = useContext(AuthContext);
  
    useEffect(() => {
      const checkEmailVerification = async () => {
        const user = state.user;
  
        if (user) {
          //await user.reload();
          
          if (!user.emailVerified) {
            dispatch({type:'LOGOUT'})
            navigate('/nv');
          }
        }
      };
  

      checkEmailVerification();
    }, [state.user, navigate]);
  
    return <>{children}</>;
  }
 
 
function App() {
  return (
    <div className="App">
    
    <BrowserRouter>
            <Routes>
              
              <Route path='/'>
                <Route index element={<RequireAuth><Chats/></RequireAuth>} />
                <Route path='login' element={<Login/>}/>
                <Route path='signup' element={<Signup/>}/>
                <Route path='chats' element={
                <RequireAuth>
                  <RequireEmailVerification>
                    <Chats/>
                  </RequireEmailVerification>
                </RequireAuth>}/>
                <Route path='confirm' element={<Confirmmail/>}/>
                <Route path='nv' element={<Needverification/>}/>


            </Route>
            </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
