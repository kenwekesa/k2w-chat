import logo from './logo.svg';
import './App.css';

import Login from './pages/forms/Login';
import Signup from './pages/forms/Signup';
import Home from './pages/home/Home';

import Chats from './pages/chats/Chats';
import { AuthContext } from './context/AuthContext';


import { Route,Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useContext } from 'react';


const RequireAuth =({children}) => 
{
  
  const {state} = useContext(AuthContext)
   return state.user? children: <Navigate to='/login'/>
}
 
function App() {
  return (
    <div className="App">
    
    <BrowserRouter>
            <Routes>
              
              <Route path='/'>
                <Route path='home' element={<RequireAuth><Home/></RequireAuth>} />
                <Route path='login' element={<Login/>}/>
                <Route path='signup' element={<Signup/>}/>
                <Route path='chats' element={<RequireAuth><Chats/></RequireAuth>}/>
            </Route>
            </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
