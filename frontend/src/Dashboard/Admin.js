import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'

const Admin = () => {

    useEffect(() => {
        axios.get("http://localhost:5000/users").then((res) =>{
            // console.log(res.data)
            setUsers(res.data)
        })
    },[])

    const[view,setView]=useState(false)
    const[users,setUsers] = useState([])
    const[add,setAdd] = useState(false)
    const[bid,setBid] = useState(0);
    const[bname,setBname] = useState("");
    const[author,setAuthor] = useState("");
    const[url,setUrl] = useState("");
    const[desc,setDesc] = useState("");
    const[rent,setRent] = useState(0);
    const[isIssued,setIsissued] = useState(false);
    const handlenewbook = () => {
        setAdd(!add)
    }
    const handleview = () => {
        console.log(users)
        setView(!view)
    }

    const handlebook = () => {
        axios.post(`http://localhost:5000/book/${bid}`,{
            bid,
            bname,
            author,
            url,
            desc,
            rent,
            isIssued
        }).then(res => {
             alert('Book added')
        })
    }

  return (
    <div className="admin-main">
        <div className="add_books">
            <button onClick={handlenewbook} className='btn'>Add new book</button>
        </div>
        {add && 
        <form className='newbook'>
        <label className='labelss' htmlFor="text">Book Name</label>
        <input type="text" placeholder='Enter the Book Name' onChange={(e) => setBname(e.target.value)}/>
        <label className='labelss' htmlFor="text">Book Id</label>
        <input type="number" placeholder='Enter the Book Id' onChange={(e) => setBid(e.target.value)}/>
        <label className='labelss' htmlFor="text">Book Author</label>
        <input type="text" placeholder='Enter the Book Author' onChange={(e) => setAuthor(e.target.value)}/>
        <label className='labelss' htmlFor="url">Book Image Url</label>
        <input type="url" placeholder='Enter the Book Iamge url' onChange={(e) => setUrl(e.target.value)}/>
        <label className='labelss' htmlFor="text">Book Description</label>
        <input type="text" placeholder='Enter the Book Description' onChange={(e) => setDesc(e.target.value)}/>
        <label className='labelss' htmlFor="text">Book Rent</label>
        <input type="number" placeholder='Enter the Book Rent' onChange={(e) => setRent(e.target.value)}/>
        <label className='labelss' htmlFor="text">Book Name</label>
        <input type="text" placeholder='Enter the Book Name' onChange={(e) => setIsissued(e.target.value)}/>
        <button onClick={handlebook}>Add book</button>
        </form>
        }
        <div className="views-users">
            <button className='btn' onClick={handleview}>View users</button>
        </div>
        {
            view &&         
            <div className='userslist'>
            {
                users.map((user) => (
                    <span className='indusers'>{user.email} {user.role}</span>
                ))
            }
        </div>
        }
    </div>
  )
}

export default Admin