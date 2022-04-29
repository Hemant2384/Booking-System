import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
import axios from 'axios'
import './Signup.css'

const Signup = () => {
  const[users,setUsers] = useState([])
  // const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('')
  const[role,setRole] = useState('admin')

const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/users').then((res) => {
       setUsers(res.data);
    })
 },[])
   
   const handleclick = (e) => {
    if(!email){
      alert("Please enter the email")
      return;
   }
   if(!password){
      alert("Please enter the Password")
      return;
   }
   axios.post("http://localhost:5000/register",{
    email,
    password,
    role,
  }).then(res => {
     setUsers([...users,{
      email,
      password,
      role,            
     }])
  })
    navigate('/login',{
    state : {
       email : email,
       }
    })
   }

  return (
    <div className='Signup'>
    <div className="heading-1">SIGNUP</div>
    <label htmlFor="email">Email</label>
    <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
    <label htmlFor="password">Password</label>
    <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)}/>
    <label htmlFor="password">Role</label>
    <select name="roles" id="role" value={role} onChange={(e) => (console.log(e.target.value),setRole(e.target.value))}>
            <option value="admin">Admin</option>
            <option value="basic">Basic</option>
    </select>
    <button onClick={handleclick}>Sign Up</button>
</div>
  )
}

export default Signup