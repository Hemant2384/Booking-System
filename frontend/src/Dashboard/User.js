import React, { useEffect, useState,useContext } from "react";
import { IContext, UserContext, WContext, WishContext } from '../App'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [booklist, setBooklist] = useState([]);
  const[viewlist,setViewlist] = useState([]);
  const[viewissuelist,setViewissuelist] = useState([]);

  // const notifydelete = () => toast("Book deleted from wishlist")
  // const notifyissue = () => toast("Book Returned")

  const message = (text) =>   toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    newestOnTop : false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable : true,
    hideProgressBar : false,
    progress: undefined,
    theme : 'light'
    });

    useEffect(() => {
      axios
      .post("http://localhost:5000/wishlist", {
        email:emailstate,
      })
      .then((res) => {
        // console.log(res.data);
         setList(res.data);
        //  console.log(wlist);
      });
    },[]);

  useEffect(() => {
    axios.get("http://localhost:5000/books")
    .then((response) => setBooklist(response.data));
  }, []);
  useEffect(() => {
    axios
    .post("http://localhost:5000/issue", {
      email,
    })
    .then((res) => {
      // console.log(res.data);
      setBooks(res.data);
    });
  }, []);
  

  const handleclick = () => {
    console.log(wlist);
    console.log(viewlist);
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
     setViewlist(booklist.filter(item => wlist.some(item2 => item.bid === item2.bid)))
      setTog(!tog)
      axios.post(`http://localhost:5000/wishlist/remove/${id}`, {
        email:emailstate
      })
      .then((res) => {
        message('Book deleted from wishlist')
        console.log(res.data)
        // notifydelete();
        //  wishdispatch({type:"WISH",payload:wlist})
    });
    
  }
  const handleremoveissue = (id,index) => {
    books.splice(index,1);
    setBooks(books);
    setViewissuelist(booklist.filter(item => books.some(item2 => item.bid === item2.bid)))
    setTogg(!togg)
    console.log(books);
    axios.post(`http://localhost:5000/issue/remove/${id}`,{
      email:emailstate
    }).then((res) => {
      // notifyissue()
    })
    message('Book Returned')
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
    console.log(booklist);
    console.log(books)
    setViewissuelist(booklist.filter(item => books.some(item2 => item.bid === item2.bid)))
  };

  return (
    <div className="User-details">
    <span className="admin-head">Welcome {email}</span>
      <div className="my-wishlist">
        <button className="btn12" onClick={handleclick}>
          View wishlist
        </button>
        <div className="my-wishlist1">
          {view && (
            <>
              {wlist.map((item, index) => (
                <div className="cell1" key={index}>
                <div className="cell1-id">
                  <div className="cell1-image">
                  <img src={`${item.url}`}/>
                  </div>
                  <p>Book Id - {item.bid}</p>
                  <p>Book Name - {item.bname}</p>
                  <p>Book Author - {item.author}</p>
                  </div>
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
                <div className="cell1-id">
                <div className="cell1-image">
                  <img src={`${item.url}`}/>
                  </div>
                <p>Date of Issue - {item.doi}</p>
                <p>Book Id - {item.bid}</p>
                <p>Book Name - {item.name}</p>
                <p>Book Author - {item.author}</p>
                <p>Period - {item.period}</p>
                <p>Amount - {item.amount}</p>
                </div>
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
