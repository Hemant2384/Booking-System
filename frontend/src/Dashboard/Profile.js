import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import ReactLoading from 'react-loading';

const Profile = () => {
  const [load, setload] = useState(false)
  useEffect(() => {
    setTimeout(() => {
        setload(true)
    }, 7000)
}, [])
   const location = useLocation();
  return (
    <>{
    !load ?
    <>
    <ReactLoading type={'spinningBubbles'} color="#FFC107" height={'20%'} width={'20%'} />
  <div className="item align-items-center top-50 " style={{ marginLeft: "45%" }}></div>
    </>:
    <>
    <div>{location.state.role}</div>
    <div>{location.state.email}</div>
    </>
  }
  </>
      
  )
}

export default Profile