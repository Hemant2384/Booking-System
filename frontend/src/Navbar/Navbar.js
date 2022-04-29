import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './Navbar.css'

const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();
  const handleclick = () => {
    dispatch({type:"USER",payload:false})
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
        <Link className='ss' to="/books"><div className="item" id='item-3'>Books</div></Link>
        <div className="item" id='item-4'>About</div>
        {state==false ?
          <>
            <Link to="/login"><button className="item" id='item-45'>Login</button></Link>
            <Link to="/register"><button className="item" id='item-5'>Signup</button></Link>
          </>
          :
          <>
            <Link to="/"><button className="item" id='item-46' onClick={handleclick}>Logout</button></Link>
          </>
        } 
      </div>
    </div>
  )
}

export default Navbar