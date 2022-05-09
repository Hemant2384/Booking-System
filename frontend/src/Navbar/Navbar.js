import React, { useEffect, useState,useContext } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AppContext,UserContext, UserNameContext } from '../App';
import {HiOutlineLibrary} from 'react-icons/hi'
import { toast } from 'react-toastify';
import moment from 'moment'
import './Navbar.css'
import axios from 'axios';
// import Activity from '../../../backend/model/activity';

const Navbar = () => {

  const [click, setClick] = useState(false);
  const [dropdown,setDropdown] = useState(false);
  const [button, setButton] = useState(true);
  const[drop,setDrop] = useState(false)
  const[activity,setActivity] = useState([])
  const { state, dispatch } = useContext(AppContext);
  const { emailstate, emaildispatch } = useContext(UserContext);
  
  const {ustate,udispatch} = useContext(UserNameContext)


  const navigate = useNavigate();
  const handleclick = () => {
    dispatch({type:"USER",payload:false})
    loggedout('Successfully Logged out');
    navigate('/');
  }

  const loggedout  = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"light"
  });

  // useEffect(() => {
  //   loggedout('Successfully Logged out');
  // },[state])


  const onMouseenter = () => {
    if (typeof window !== "undefined"){
        if(window.innerWidth<960){
        setDropdown(false);
    }
    else{
        setDropdown(true);
    }
}
}

     const onMouseleave = () => {
    if (typeof window !== "undefined"){
        if(window.innerWidth<960){
            setDropdown(true);
        }
    else{
        setDropdown(false);
    }
}
}

      const showButton = () =>{
    if (typeof window !== "undefined"){
    if(window.innerWidth<=960){
        setButton(false);
    }
    else{
        setButton(true);
    }
}
}
      useEffect(() =>
      {
  //  console.log(userdetails.loggedin);
    showButton();
    },
[])
       const handleClick = () => setClick(!click);
      const closeMobileMenu = () => setClick(false);

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
    <>
    {
      click ? 
      <nav className='main'>
      <div className='navbar-container'>
      <Link to='' className="nav-logo">
        <HiOutlineLibrary className='nav-icon'/>
        GreySense
      </Link>
    <div className='Mobile-Icon' onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
    </div>
      <ul className="nav-menu" onClick={handleClick} click={click}>
          {drop && (<>
          <ul className='dropdown'>
          {
            activity.map((item,index) => (
              <li className='dropdown-content' key={index}>
                <span>{item.email==emailstate ? <>You</> : <>{item.name}</>} issued the book {item.bname}</span>
                <p>{moment(item.date).startOf('hour').fromNow()}</p>
              </li>
            ))
          }
        </ul>
        </>)}
        <li className="nav-item" id='item-1' onMouseEnter={() => handleenter()} onMouseLeave={() => setDrop(false)}>
          <Link className='ss'  to=''> Recent </Link></li>
        {state && <li className="nav-item" id='item-2'><Link className='ss' id='ss1' to='/profile'>{ustate}</Link></li>}
       <li
       onMouseLeave={onMouseleave} 
        className="nav-item" id='item-3'>
          <Link 
          onMouseEnter={onMouseenter} 
          onClick={closeMobileMenu}
          className='ss' to="/books">
            Books
          </Link>
        </li>
       <li className="nav-item" id='item-4'><Link className='ss' to='/'>Home</Link></li>
        {state==false ?
          <>
            <Link className='Navbtnlink' to="/login"><button className="item" id='item-45'>Login</button></Link>
            <Link className='Navbtnlink' to="/register"><button className="item" id='item-5'>Signup</button></Link>
          </>
          :
          <>
            <Link className='Navbtnlink' to="/"><button className="item" id='item-46' onClick={handleclick}>Logout</button></Link>
          </>
        } 
      </ul>
      </div>
    </nav>
      :
      <nav className='main'>
      <div className='navbar-container'>
      <Link to='' className="nav-logo">
        <HiOutlineLibrary className='nav-icon'/>
        GreySense
      </Link>
    <div className='Mobile-Icon' onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
    </div>
      <ul className="nav-menuu" onClick={handleClick} click={click}>
      {drop && (<>
        <div className='dropdown'>
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
        <li className="nav-item" id='item-1' onMouseEnter={() => handleenter()} onMouseLeave={() => setDrop(false)}>
          <Link className='ss' id='item' to=''> Recent </Link>
        </li>
        {state && <li className="nav-item" id='item-2'><Link className='ss' id='ss1' to='/profile'>{ustate}</Link></li>}
       <li
       onMouseLeave={onMouseleave} 
        className="nav-item" id='item-3'>
          <Link 
          onMouseEnter={onMouseenter} 
          onClick={closeMobileMenu}
          className='ss' to="/books">
            Books
          </Link>
        </li>
       <li className="nav-item" id='item-4'><Link className='ss' to='/'>Home</Link></li>
        {state==false ?
          <>
            <Link className='Navbtnlink' to="/login"><button className="item" id='item-45'>Login</button></Link>
            <Link className='Navbtnlink' to="/register"><button className="item" id='item-5'>Signup</button></Link>
          </>
          :
          <>
            <Link className='Navbtnlink' to="/"><button className="item" id='item-46' onClick={handleclick}>Logout</button></Link>
          </>
        } 
      </ul>
      </div>
    </nav>
    }
    </>
  )
}

export default Navbar