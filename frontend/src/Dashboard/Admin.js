import React, { useEffect, useState,useContext } from 'react'
import './Admin.css'
import axios from 'axios'
import { RoleContext } from '../App'


const Admin = ({ role, email }) => {

    // useEffect(() => {

    // },[])
    const [books, setBooks] = useState([])
    const [view, setView] = useState(false)
    // const[vieww,setVieww]=useState(false)
    const [users, setUsers] = useState([])
    const [add, setAdd] = useState(false)
    const [bid, setBid] = useState(0);
    const [bname, setBname] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [rent, setRent] = useState(0);
    const [isIssued, setIsissued] = useState(false);
    const { rolestate, roledispatch } = useContext(RoleContext);

    const handlenewbook = () => {
        setAdd(!add)
    }
    const handleview = () => {
        // e.preventDefault();
        setView(!view)
        axios.post("http://localhost:5000/users", {
            role:rolestate
        }).then((res) => {
            console.log(res.data)
            setUsers(res.data)
        })
        // console.log(users)
    }
    const handlebook = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/book/add`, {
            role: rolestate,
            bid,
            bname,
            author,
            url,
            desc,
            rent,
            isIssued
        }).then((res) => {
            alert('Book added')
        })
        setBname("");
        setAuthor("");
        setUrl("");
        setDesc("");
    }


    const handlesub = (e) => {
        e.preventDefault();
    }

    return (
        <div className="admin-main">
            <span className='admin-head' >Admin {email}</span>
            <div className="add_books">
                <button onClick={handlenewbook} className='btn1'>Add new book</button>
                {add &&
                    <form className='newbook' onSubmit={handlesub}>
                        <div className='mycontents'>
                            <div className="cell">
                                <label className='labelss' htmlFor="text">Book Name</label>
                                <input type="text" placeholder='Enter the Book Name' onChange={(e) => setBname(e.target.value)} />
                            </div>
                            <div className="cell">
                                <label className='labelss' htmlFor="text">Book Id</label>
                                <input type="number" placeholder='Enter the Book Id' onChange={(e) => setBid(e.target.value)} />
                            </div>
                            <div className="cell">
                                <label className='labelss' htmlFor="text">Book Author</label>
                                <input type="text" placeholder='Enter the Book Author' onChange={(e) => setAuthor(e.target.value)} />
                            </div>
                            <div className="cell">
                                <label className='labelss' htmlFor="url">Book Image Url</label>
                                <input type="url" placeholder='Enter the Book Iamge url' onChange={(e) => setUrl(e.target.value)} />
                            </div>
                            <div className="cell">
                                <label className='labelss' htmlFor="text">Book Description</label>
                                <input type="text" placeholder='Enter the Book Description' onChange={(e) => setDesc(e.target.value)} />
                            </div>
                            <div className="cell">
                                <label className='labelss' htmlFor="text">Book Rent</label>
                                <input type="number" placeholder='Enter the Book Rent' onChange={(e) => setRent(e.target.value)} />
                            </div>
                            {/* <label className='labelss' htmlFor="text">Book issued</label>
        <input type="text" placeholder='Enter the Book isIssued' onChange={(e) => setIsissued(e.target.value)}/> */}
                        </div>
                        <button type="submit" className='subbtn' onClick={handlebook}>Add book</button>
                    </form>
                }
            </div>
            <button className='btn1' onClick={handleview}>View users</button>
            <div className="views-users">
                {
                    view &&
                    <>
                        {
                            users.map((user, index) => (
                                <>
                                    <div className='indusers'>{user.email} {user.role}
                                        <button className='btn-23' key={index}>View issues</button>
                                    </div>
                                </>
                            ))
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Admin