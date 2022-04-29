import React from 'react'
import {useLocation} from 'react-router-dom';

const Profile = () => {
   const location = useLocation();
  return (
      <>
    <div>{location.state.role}</div>
    <div>{location.state.email}</div>
    </>
  )
}

export default Profile