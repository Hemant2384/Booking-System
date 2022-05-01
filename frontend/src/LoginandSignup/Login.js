import React from 'react'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AppContext,UserContext } from '../App'
import './Login.css'

const Login = () => {

  const { state, dispatch } = useContext(AppContext);
  const { emailstate, emaildispatch } = useContext(UserContext);

  // const[name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const navigate = useNavigate();
  // localStorage.getItem('token')

  const handleclick = (e) => {
    axios.post("http://localhost:5000/login", {
      email,
      password,
      role,
    }).then((res) => {
      console.log(res.data);
      dispatch({type:"USER",payload:true})
      emaildispatch({type:"EMAIL",payload:email})
    }
    ).catch((err) => {
      console.log(err);
    })
    console.log(emailstate);
    navigate('/profile', {
      state: {
        role: role,
        email: email,
      }
    })
  }

  return (
    <>
      <div className='Login'>
        <div className="heading">LOGIN</div>
        <form>
        <label className='labels' htmlFor="email">Email</label>
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        <label className='labels' htmlFor="password">Password</label>
        <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} />
        <label className='labels' htmlFor="Role">Role</label>
        <select name="roles" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="basic">Basic</option>
        </select>
        <button onClick={handleclick}>Login</button>
        </form>
    </div>
    </>
  )
}

export default Login