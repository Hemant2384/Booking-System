import React, { useEffect, useState,useContext, useCallback } from 'react'
import { IssueContext, UserContext, WishContext,RoleContext } from '../App'
import {BiSearch} from 'react-icons/bi'
import ReactLoading from 'react-loading';
import axios from 'axios'
// import books from '../books'
import './Books.css'


const Books = () => {

    const[reload,setReload] = useState(false)
    const[value,setValue] = useState('');
    // const[word,setWord] = useState('Enter the book name')
    const { wishstate, wishdispatch } = useContext(WishContext);
    const { issuestate, issuedispatch } = useContext(IssueContext);
    const { rolestate, roledispatch } = useContext(RoleContext);
    const[filtereddata,setFiltereddata] = useState([]);
    const[days,setDays] = useState(1)
    const [load, setload] = useState(false)
    const[books,setBooks] = useState([])

    const { emailstate, emaildispatch } = useContext(UserContext);
    useEffect(() => {
        axios.get('http://localhost:5000/books').then(
          (response) => setBooks(response.data))
    },[])
    useEffect(() => {
      axios.post('http://localhost:5000/wishlist',{
        email:emailstate,
        role:rolestate
      }).then((res) => wishdispatch({type:"WISH",payload:res.data}))
}, []);

    useEffect(() => {
      setTimeout(() => {
          setload(true)
      }, 1000)
  }, [])

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
        role:rolestate,
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

    const handleissue  = (id,rent,name) => {
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
        role:rolestate,
        period : days,
        amount : days*rent
      }).then(res => {
        // console.log(res.data);
        issuedispatch({type:"ISSUE",payload:res.data})
        alert(`Book Issued for ${days} days`)
      })

      axios.post('http://localhost:5000/activity',{
        email : emailstate,
        role:rolestate,
        bid : id,
        bname : name
      }).then((res) => {
        console.log("Added to recent")
      })

    }

    const handlesearch = (e) => {
      const word=e.target.value
      console.log(word);
      setValue(e.target.value)
      console.log(value);
      const newarr = books.filter((item) => {
        return item.bname.trim().toLowerCase().includes(word.trim().toLowerCase());
    })
        console.log(newarr);
        if(word === ""){
        setFiltereddata([]);
        }
       else{
       setFiltereddata(newarr);
       }
     console.log(filtereddata);
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
      <div className='seach-book'>
        <input className='inp-1' placeholder='Enter the book Name' onChange={(e) => handlesearch(e)}/>
        <BiSearch className="icon-1"/>
      </div>
      {
                filtereddata.length!==0 ? <>
                <div className="myservices">
                    <div className="contents">
                {
                    filtereddata.slice(0,10).map((book,index) => {
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
                              <button  onClick={() => handleissue(book.bid,book.rent,book.bname)} >Issue</button>
                            </div>
                          </div>
                        )
                    })
                }
                </div>
                </div>
                </> :
                <>
                  <div className="myservices">
                    <div className="contents">
                {
                    books.map((book,index) => {
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
                              <button  onClick={() => handleissue(book.bid,book.rent,book.bname)} >Issue</button>
                            </div>
                          </div>
                        )
                    })
                }
                </div>
                </div>
                </>
          }
      {/* <div className="myservices">
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
                  <button  onClick={() => handleissue(book.bid,book.rent,book.bname)} >Issue</button>
                </div>
              </div>
            )
          })}
        </div>
      </div> */}
    </div>
}
    </>
  )
}

export default Books