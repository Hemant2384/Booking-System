import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {

  // const[token,setToken] = useState(0)

  // useEffect(() => {
  //   setToken(localStorage.getItem('token')) 
  // },[])

  
  const navigate = useNavigate();
  const handleclick = () => {
    localStorage.setItem('token',0);
    setToken(0);
    navigate('/');
  }

  return (
    <div className='main'>
      <div className="left-logo">
        Library XYZ
      </div>
      <div className="nav-items">
        <div className="item" id='item-1'>Admin</div>
        <div className="item" id='item-2'>Profile</div>
        <div className="item" id='item-3'>Books</div>
        <div className="item" id='item-4'>About</div>
        {token == 0 ?
           <> 
           <Link to="/login"><button className="item" id='item-4'>Login</button></Link>
           <Link to="/register"><button className="item" id='item-5'>Signup</button></Link>
           </>
           :
           <>
           <Link to="/"><button className="item" id='item-4' onClick={handleclick}>Logout</button></Link>
           </>
        }
      </div>
    </div>
  )
}

export default Navbar