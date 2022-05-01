import React, { useEffect, useState } from 'react'
import axios from 'axios'

const User = ({email}) => {

  const[wlist,setList] = useState([])

  // useEffect(() => {
   
  // },[])

  const handleclick = () => {
    axios.post("http://localhost:5000/wishlist",{
      email
    }).then(
      (res) => {
        console.log(res.data);
        setList(res.data)
      }
    )
  }

  return (
    <div className='User-details'>
      <div className="my-wishlist">
        <button onClick={handleclick}>View wishlist</button>
        My wishlist
        {wlist.length === 0?
        <span>No item in wishlist</span> : 
        <>
         {wlist.map((item) => 
           item.bid)}
          </>
        }
      </div>
      <div className="books-issued">
        Books issued
      </div>
    </div>
  )
}

export default User