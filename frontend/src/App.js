import React,{createContext, useReducer} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Home from './Home';
import Navbar from './Navbar/Navbar';
import Login from './LoginandSignup/Login';
// import {Switch} from 'react-router'
import Signup from './LoginandSignup/Signup';
import Profile from './Dashboard/Profile';
import { initialState,reducer } from './reducer/UseReducer';


export const AppContext = createContext(false);


const App = () => {

  const [state,dispatch] = useReducer(reducer,initialState)
  console.log(state)
  return (
    <>
    <AppContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export default App