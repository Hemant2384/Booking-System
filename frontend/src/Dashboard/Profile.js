import React,{useState,useEffect,useContext} from 'react'
import {useLocation} from 'react-router-dom';
import ReactLoading from 'react-loading';
import { AppContext,UserContext } from '../App';
import './Profile.css'
import User from './User';
import Admin from './Admin';

const Profile = () => {
  // const { state, dispatch } = useContext(AppContext);
  const { emailstate, emaildispatch } = useContext(UserContext);
  const [load, setload] = useState(false)
  const handleclick = () => {
    console.log(emailstate);
  } 
  useEffect(() => {
    setTimeout(() => {
        setload(true)
    }, 7000)
}, [])
   const location = useLocation();
  return (
       <>
     {
    !load ?
    <>
    <ReactLoading className='loader' type={'spinningBubbles'} color="#FFC107"/>
    <div className="item align-items-center top-50 " style={{ marginLeft: "45%" }}></div>
    </>:
    <>
    {location.state.role === "admin"? 
    <Admin/>:
    <User/>}
    </>
  }
  </>
      
  )
}

export default Profile