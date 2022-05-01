import React,{createContext, useReducer} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Home from './Home';
import Navbar from './Navbar/Navbar';
import Login from './LoginandSignup/Login';
// import {Switch} from 'react-router'
import Signup from './LoginandSignup/Signup';
import Profile from './Dashboard/Profile';
import { initialState,userreducer,emailreducer } from './reducer/UseReducer';
import Books from './Books/Books';


export const AppContext = createContext(false);
export const UserContext = createContext('');

const App = () => {

  const [state,dispatch] = useReducer(userreducer,initialState)
  const [emailstate,emaildispatch] = useReducer(emailreducer,initialState)
  console.log(state)
  return (
    <>
    <AppContext.Provider value={{state,dispatch}}>
    <UserContext.Provider value={{emailstate,emaildispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/books" element={<Books/>}/>
    </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </AppContext.Provider>
    </>
  )
}

export default App