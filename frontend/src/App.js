import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Home from './Home';
import Navbar from './Navbar/Navbar';
import Login from './LoginandSignup/Login';
// import {Switch} from 'react-router'
import Signup from './LoginandSignup/Signup';
import Profile from './Dashboard/Profile';
import Books from './Books/Books';


const App = () => {
  localStorage.setItem('token', 0)
  // localStorage.getItem('token')
  return (
    <>
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
    </>
  )
}

export default App