import React, { useEffect, useState, useContext } from "react";
import {
  UserContext,
  WishContext,
  RoleContext,
  GenderContext,
  UserNameContext,
} from "../App";
import { ToastContainer, toast } from "react-toastify";
import { RiDeleteBinFill } from "react-icons/ri";
import Fade from 'react-reveal/Fade';
import axios from "axios";
import "./User.css";

const User = ({ email }) => {
  const [tog, setTog] = useState(false);
  const [togg, setTogg] = useState(false);
  const [view, setView] = useState(false);
  const [vieww, setVieww] = useState(false);
  const [wlist, setList] = useState([]);
  const [books, setBooks] = useState([]);
  const { emailstate, emaildispatch } = useContext(UserContext);
  const { rolestate, roledispatch } = useContext(RoleContext);
  const { ustate, udispatch } = useContext(UserNameContext);
  const { gstate, gdispatch } = useContext(GenderContext);
  const [booklist, setBooklist] = useState([]);
  const [viewlist, setViewlist] = useState([]);
  const [viewissuelist, setViewissuelist] = useState([]);

  // const notifydelete = () => toast("Book deleted from wishlist")
  // const notifyissue = () => toast("Book Returned")

  const message = (text) =>
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      newestOnTop: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    axios
      .post("http://localhost:5000/wishlist", {
        email: emailstate,
        role: rolestate,
      })
      .then((res) => {
        // console.log(res.data);
        setList(res.data);
        //  console.log(wlist);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
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
    if(vieww===false){
      setView(!view);
    }
    axios
      .post("http://localhost:5000/wishlist", {
        email: emailstate,
        role: rolestate,
      })
      .then((res) => {
        // console.log(res.data);
        setList(res.data);
        //  console.log(wlist);
      });
  };

  useEffect(() => {
    setList(wlist);
  }, [tog]);

  useEffect(() => {
    setBooks(books);
  }, [togg]);

  const handleremove = (id, index) => {
    wlist.splice(index, 1);
    console.log(wlist);
    setList(wlist);
    setTog(!tog);
    axios
      .post(`http://localhost:5000/wishlist/remove/${id}`, {
        email: emailstate,
        role: rolestate,
      })
      .then((res) => {
        message("Book deleted from wishlist");
        console.log(res.data);
        // notifydelete();
        //  wishdispatch({type:"WISH",payload:wlist})
      });
  };
  const handleremoveissue = (id, index) => {
    books.splice(index, 1);
    setBooks(books);
    setViewissuelist(
      booklist.filter((item) => books.some((item2) => item.bid === item2.bid))
    );
    setTogg(!togg);
    console.log(books);
    axios
      .post(`http://localhost:5000/issue/remove/${id}`, {
        email: emailstate,
        role: rolestate,
      })
      .then((res) => {
        // notifyissue()
      });
    message("Book Returned");
  };

  const handleissue = () => {
    if(view==false){
    setVieww(!vieww);
    }
    axios
      .post("http://localhost:5000/issue", {
        email: emailstate,
        role: rolestate,
      })
      .then((res) => {
        // console.log(res.data);
        setBooks(res.data);
      });
  };

  return (
    <div className="User-details">
      <Fade top>
      <div className="avatar">
        <img src={`https://avatars.dicebear.com/api/${gstate}/${ustate}.svg`} />
      </div>
      </Fade>
      <span className="admin-head">Welcome {ustate}</span>
      <div className="count">
        <div className="total1">
          Books in wishlisht
          <p>{wlist.length} </p> 
        </div>
        <div className="total">
          Books issued
        <p>{books.length}</p> 
        </div>
      </div>
      <div className="buttons">
      <button className="btn12" onClick={handleclick}>
            View wishlist
          </button>
          <button className="btn12" onClick={handleissue}>
          View Books
        </button>
      </div>
        <div className="my-wishlist">
          <div className="my-wishlist1">
            {view && (
              <>
                {wlist.map((item, index) => (
                  <Fade top>
                  <div className="cell1" key={index}>
                    <div className="del-icon">
                      <RiDeleteBinFill
                        onClick={() => handleremove(item.bid, index)}
                      />
                    </div>
                    <div className="cell1-id">
                      <div className="cell1-image">
                        <img src={`${item.url}`} />
                      </div>
                      <p>{item.bname}</p>
                      <p>{item.author}</p>
                    </div>
                  </div>
                  </Fade>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="books-issued">
        <div className="my-wishlist1">
          {vieww && (
            <>
              {books.map((item, index) => (
                 <Fade top>
                <div className="cell2" key={index}>
                  <div className="del-icon">
                    <RiDeleteBinFill
                      onClick={() => handleremoveissue(item.bid, index)}
                    />
                  </div>
                  <div className="cell1-id">
                    <div className="cell1-image">
                      <img src={`${item.url}`} />
                    </div>
                    <p>Date of Issue - {item.doi}</p>
                    <p>{item.name}</p>
                    <p>{item.author}</p>
                    <p>Duration - {item.period}</p>
                    <p>Amount - {item.amount}</p>
                  </div>
                </div>
                </Fade>
              ))}
            </>
          )}
          </div>
        </div>
      </div>
  );
};

export default User;
