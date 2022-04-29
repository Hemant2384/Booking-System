import React, { useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom';
// const navigate = useNavigate();
import axios from 'axios'
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')

  const navigate = useNavigate();


  const handleclick = (e) => {
    if (!email) {
      alert("Please enter the email")
      return;
    }
    if (!password) {
      alert("Please enter the Password")
      return;
    }
    axios.post("http://localhost:5000/register", {
      email,
      password,
      role,
    }).then(res => {
      console.log(res.data.message)
    })
    navigate('/login', {
      state: {
        email: email,
      }
    })
  }

  return (
    <>
      <div className='Signup'>
        <div className="heading-1">SIGNUP</div>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="password">Role</label>
        <select name="roles" id="role" value={role} onChange={(e) => (console.log(e.target.value), setRole(e.target.value))}>
          <option value="admin">Admin</option>
          <option value="basic">Basic</option>
        </select>
        <button onClick={handleclick}>Sign Up</button>
      </div>
      <div className="foot">
        <h2>Already a User?<Link to="/login"><div className="btn" id='item-5'>Login</div></Link></h2>

      </div>
    </>
  )
}

export default Signup