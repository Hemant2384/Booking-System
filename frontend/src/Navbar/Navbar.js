import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AppContext,UserContext } from '../App';
import {HiOutlineLibrary} from 'react-icons/hi'
import moment from 'moment'
import './Navbar.css'
import axios from 'axios';
// import Activity from '../../../backend/model/activity';

const Navbar = () => {

  const[drop,setDrop] = useState(false)
  const[activity,setActivity] = useState([])
  const { state, dispatch } = useContext(AppContext);
  const { emailstate, emaildispatch } = useContext(UserContext);


  const navigate = useNavigate();
  const handleclick = () => {
    dispatch({type:"USER",payload:false})
    navigate('/');
  }

  const handleenter = () => {
    setDrop(true)
    axios.get("http://localhost:5000/activities").then(
      (res) => {
        setActivity(res.data)
        console.log(res.data)
      }
    )
  }

  return (
    <div className='main'>
      <div className="left-logo">
        National Library <HiOutlineLibrary/>
      </div>
      <div className="nav-items">
        <div className="item" id='item-1' onMouseEnter={() => handleenter()} onMouseLeave={() => setDrop(false)}>Recent
        {drop && (<>
        <div className='dropdown' >
          {
            activity.map((item,index) => (
              <div className='dropdown-content' key={index}>
                <span>{item.email==emailstate ? <>You</> : <>{item.email}</>} issued the book {item.bname}</span>
                <p>{moment(item.date).startOf('hour').fromNow()}</p>
              </div>
            ))
          }
        </div>
        </>)}
        </div>
        {state && <Link className='ss' to='/profile'><div className="item" id='item-2'>{emailstate}</div></Link>}
       <div className="item" id='item-3'> <Link className='ss' to="/books">Books</Link></div>
       <div className="item" id='item-4'><Link className='ss' to='/'>About</Link></div>
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