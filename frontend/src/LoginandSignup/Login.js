import React from 'react'
import axios from 'axios'
import { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import './Login.css'

const Login = () => {
  // const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('')
  const[role,setRole] = useState('admin')
  const navigate = useNavigate();
  // localStorage.getItem('token')

  const handleclick = (e) => {
    axios.post("http://localhost:5000/login",{
      email,
      password,
      role,
    }).then((res) => {
      console.log(res.data);
      localStorage.setItem('token',res.data.token)
    }
    ).catch((err) => {
      console.log(err);
    })
    // if(localStorage.getItem('token') == 0){
    //   alert("Details not matching");
    //   return;
    // }
    navigate('/profile',{
      state : {
         role : role,
         email : email,
         }
      }) 
  }

  return (
    <div className='Login'>
        <div className="heading">LOGIN</div>
        <label className='labels' htmlFor="email">Email</label>
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
        <label className='labels' htmlFor="password">Password</label>
        <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)}/>
        <label className='labels' htmlFor="Role">Role</label>
        <select name="roles" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="basic">Basic</option>
        </select>
        <button onClick={handleclick}>Login</button>
    </div>
  )
}

export default Login