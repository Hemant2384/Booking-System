import React, { useEffect, useState } from 'react'
import axios from 'axios'

const User = () => {

  const[wlist,setList] = useState([])

  useEffect(() => {
    axios.get("https://localhost:5000/wishlist").then(
      (res) => {
        setList([...wlist,res.data])
      }
    )
  },[])

  return (
    <div className='User-details'>
      <div className="my-wishlist">
        My wishlist
        {wlist.length === 0?
        <span>No item in wishlist</span> : 
         {wlist}
        }
      </div>
      <div className="books-issued">
        Books issued
      </div>
    </div>
  )
}

export default User