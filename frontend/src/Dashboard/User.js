import React, { useEffect, useState,useContext } from "react";
import { UserContext, WishContext } from '../App'
import axios from "axios";
import "./User.css";

const User = ({ email }) => {

  const[tog,setTog] = useState(false);
  const[togg,setTogg] = useState(false);
  const [view, setView] = useState();
  const [vieww, setVieww] = useState();
  const [wlist, setList] = useState([]);
  const [books, setBooks] = useState([]);
  const { emailstate, emaildispatch } = useContext(UserContext);
  const { wishstate, wishdispatch } = useContext(WishContext);
  const [bookss, setBookss] = useState([
    {
      id: 0,
      bname: " ",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => setBookss(response.data));
  }, []);

  const handleclick = () => {
    setView(!view);
    axios
      .post("http://localhost:5000/wishlist", {
        email:emailstate,
      })
      .then((res) => {
        // console.log(res.data);
         setList(res.data);
        //  console.log(wlist);
      });
    };

    useEffect(() => {
      setList(wlist)
    },[tog])

    useEffect(() => {
      setBooks(books)
    },[togg])
    
    const handleremove = (id,index) => {
      wlist.splice(index,1);
      console.log(wlist);
      setList(wlist)
      setTog(!tog)
      axios.post(`http://localhost:5000/wishlist/remove/${id}`, {
        email:emailstate
      })
      .then((res) => {
        alert('Book deleted from wishlist')
        //  wishdispatch({type:"WISH",payload:wlist})
    });
    
  }
  const handleremoveissue = (id,index) => {
    books.splice(index,1);
    setBooks(books);
    setTogg(!togg)
    console.log(books);
    axios.post(`http://localhost:5000/issue/remove/${id}`,{
      email:emailstate
    }).then((res) => {
      alert('Book Returned')
    })
  }

  const handleissue = () => {
    setVieww(!vieww);
    axios
      .post("http://localhost:5000/issue", {
        email,
      })
      .then((res) => {
        // console.log(res.data);
        setBooks(res.data);
      });
  };

  return (
    <div className="User-details">
      <span className="admin-head">User {email}</span>
      <div className="my-wishlist">
        <button className="btn12" onClick={handleclick}>
          View wishlist
        </button>
        <div className="my-wishlist1">
          {view && (
            <>
              {wlist.map((item, index) => (
                <div className="cell1" key={index}>
                  Book Id - {item.bid}
                  <button onClick={() => handleremove(item.bid,index)}>Remove</button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
        <button className="btn12" onClick={handleissue}>
          View Books
        </button>
      <div className="books-issued">
        {vieww && (
          <>
            {books.map((item,index) => (
              <div className="cell2" key={index}>
                <p>Date of Issue - {item.doi}</p>
                <p>Book Id - {item.bid}</p>
                <p>Period - {item.period}</p>
                <p>Amount - {item.amount}</p>
                <button onClick={() => handleremoveissue(item.bid,index)}>Remove</button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default User;
