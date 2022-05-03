import React, { useEffect, useState,useContext, useCallback } from 'react'
import { IssueContext, UserContext, WishContext } from '../App'
import ReactLoading from 'react-loading';
import axios from 'axios'
// import books from '../books'
import './Books.css'


const Books = () => {

    const[reload,setReload] = useState(false)
    const { wishstate, wishdispatch } = useContext(WishContext);
    const { issuestate, issuedispatch } = useContext(IssueContext);
    const[days,setDays] = useState(1)
    const [load, setload] = useState(false)
    const[books,setBooks] = useState([])

    const { emailstate, emaildispatch } = useContext(UserContext);

    // const[books,setbooks] = useState([])
    // const[list,setList] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/books').then(
          (response) => setBooks(response.data))
    },[])
    useEffect(() => {
      axios.post('http://localhost:5000/wishlist',{
        email:emailstate,
      }).then((res) => wishdispatch({type:"WISH",payload:res.data}))
}, []);

    useEffect(() => {
      setTimeout(() => {
          setload(true)
      }, 1000)
  }, [])


  // const fetchData = () => {
  //     axios.post("http://localhost:5000/wishlist", {
  //     email:emailstate,
  //     })
  //   .then((res) => {
  //     console.log(res.data);
  //     // setList(res.data);
  //     wishdispatch({type:"EMAIL",payload:res.data})
  //     console.log(wishstate);
  //   });
  // };

    // const onchangee = useCallback((e) => {
    //   setDays(e.target.value)
    // },[])
    const handlewishlist = (id) => {
      console.log(wishstate)
      setReload(!reload)
      if(wishstate!=undefined){
      if(wishstate.length!=0){
        const checkpres = wishstate.find(item => 
          item.bid == id
        )
        console.log(checkpres);
        if(checkpres!=undefined){
          if(checkpres.bid==id) {
            alert('Book already present in wishlist')
            return;
          }
        }
      }
    }
      axios.post(`http://localhost:5000/wishlist/${id}`,{
        email : emailstate,
        wlist : {
          bid : id
        } 
      }).then(res => {
        // setList(res.data)
        console.log(res.data)
        wishdispatch({type:"WISH",payload:res.data})
        alert('Books added to wishlisht');
      })
    }

    const handleissue  = (id,rent) => {
      console.log(issuestate)
      setReload(!reload)
      if(issuestate!=undefined){
      if(issuestate.length!=0){
        const checkpres = issuestate.find(item => 
          item.bid == id
        )
        console.log(checkpres);
        if(checkpres!=undefined){
          if(checkpres.bid==id) {
            alert('Book already Issued')
            return;
          }
        }
      }
    }
      axios.post(`http://localhost:5000/issue/${id}`,{
        email : emailstate,
        period : days,
        amount : days*rent
      }).then(res => {
        // console.log(res.data);
        issuedispatch({type:"ISSUE",payload:res.data})
        alert(`Book Issued for ${days} days`)
      })
    }

  return (
    <>
    { !load ?
    <>
    <ReactLoading className='loader' type={'spinningBubbles'} color="#FFC107"/>
    </> :
    <div className="mainn">
      <div className="main-heading">
        Books
      </div>
      <div className="myservices">
        <div className="contents">
          {books.map((book,index) => {
            return (
              <div className="main_displayy" key={index}>
                <div className="card_component">
                  <div className="services_data">
                    <img className='images' src={`${book.url}`} />
                  </div>
                  <div className="service_name">{book.bname}</div>
                  <div className="author">{book.author}</div>
                  <div className="card_content">
                    {book.desc}
                  </div>
                  <button onClick={() => handlewishlist(book.bid)}>Add to Wishlist +</button>
                  <input className='inps' type="number" placeholder="Issue for (in days)" onChange={(e) => setDays(e.target.value)} />
                  <button  onClick={() => handleissue(book.bid,book.rent)} >Issue</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
}
    </>
  )
}

export default Books