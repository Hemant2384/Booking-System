import React, { useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom';
// const navigate = useNavigate();
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'

const Signup = () => {
  const[name,setName] = useState('')
  const[gender,setGender] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')

  const navigate = useNavigate();
  
  const notifyemail= () => toast("Enter your email")
  const notifypassword = () => toast("Enter your password")
  const success = () => toast("Succesfully registered")

  const handleclick = () => {
    
    if (!email) {
      // e.preventDefault();
      toast.warn('Please enter the email', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        
      // notifyemail();
      // alert("Please enter the email")
      return;
    }
    if (!password) {
      // e.preventDefault();
      toast.warn('Please enter the password', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      // alert("Please enter the Password")
      return;
    }
    // e.preventDefault();
    axios.post("http://localhost:5000/register", {
      name,
      email,
      gender,
      password,
      role
    }).then(res => {
      console.log(res.data.message)
      success();
      navigate('/login', {
      state: {
          email: email,
        }
      })
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='Signup'>
    <div className="heading-1">SIGNUP</div>
    <form onSubmit={handlesubmit}>
    <label htmlFor="name">Name</label>
    <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
    <label htmlFor="email">Email</label>
    <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
    <label htmlFor="gender">Gender</label>
    <input type="text" placeholder="Enter your Gender" onChange={(e) => setGender(e.target.value)}/>
    <label htmlFor="password">Password</label>
    <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)}/>
    <label htmlFor="password">Role</label>
    <select name="roles" id="role" value={role} onChange={(e) => (console.log(e.target.value),setRole(e.target.value))}>
            <option value="admin">Admin</option>
            <option value="basic">Basic</option>
    </select>
    <button onClick={handleclick}>Sign Up</button>
    <p className='small'>Already Have a Account? <Link to='/login'>Log in</Link></p>
    </form>
</div>
  )
}

export default Signup