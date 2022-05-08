import React,{useState,useEffect,useContext} from 'react'
import {useLocation} from 'react-router-dom';
import ReactLoading from 'react-loading';
import { AppContext,RoleContext,UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'
import User from './User';
import Admin from './Admin';

const Profile = () => {
  // const { state, dispatch } = useContext(AppContext);
  const { emailstate, emaildispatch } = useContext(UserContext);
  const { rolestate, roledispatch } = useContext(RoleContext);
  const [load, setload] = useState(false)
  const handleclick = () => {
    console.log(emailstate);
  } 
  // useEffect(() => {
  //   loggedin('Successfully Logged in');
  // },[emailstate])
  
  // const loggedin  = (message) =>
  // toast.success(message, {
  //   position: "top-center",
  //   autoClose: 2000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme:"light"
  // });
  

  useEffect(() => {
        setload(true)
}, [emailstate])
  //  const location = useLocation();
  return (
       <>
     {
    !load ?
    <>
    <ReactLoading className='loader' type={'spinningBubbles'} color="#FFC107"/>
    <div className="item align-items-center top-50 " style={{ marginLeft: "45%" }}></div>
    </>:
    <>
    {rolestate=== "admin"? 
    <Admin role={rolestate} email={emailstate}/>:
    <User email={emailstate}/>}
    </>
  }
  </>
      
  )
}

export default Profile