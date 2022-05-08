import React, { useEffect, useState,useContext, useCallback } from 'react'
<<<<<<< HEAD
import { IContext, IssueContext, TotalIssueContext, TotalWishContext, UserContext, WContext, WishContext } from '../App'
import {BiSearch,BiBookAdd,BiBookHeart} from 'react-icons/bi'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
=======
import { IssueContext, UserContext, WishContext,RoleContext } from '../App'
import {BiSearch} from 'react-icons/bi'
>>>>>>> 70f9ca4993d332b514da6938123c14a44cc36165
import ReactLoading from 'react-loading';
import axios from 'axios'
// import { Tooltip } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reveal from 'react-reveal/Reveal';
import Flip from 'react-reveal/Flip';
// import books from '../books'
import './Books.css'


const Books = () => {

    const[reload,setReload] = useState(false)
    const[value,setValue] = useState('');
    // const[word,setWord] = useState('Enter the book name')
    const[iswishlist,setIswishlist] = useState([])
    const { wishstate, wishdispatch } = useContext(WishContext);
    const { totalwishstate, totalwishdispatch } = useContext(TotalWishContext);
    const { totalissuestate, totalissuedispatch } = useContext(TotalIssueContext);
    const { wstate, wdispatch } = useContext(WContext);
    const { istate, idispatch } = useContext(IContext);
    const { issuestate, issuedispatch } = useContext(IssueContext);
    const { rolestate, roledispatch } = useContext(RoleContext);
    const[filtereddata,setFiltereddata] = useState([]);
    const[days,setDays] = useState(0)
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
<<<<<<< HEAD
      }).then((res) => totalwishdispatch({type:"WISHLIST",payload:res.data}))
   }, []); 
    useEffect(() => {
      axios.post('http://localhost:5000/issue',{
        email:emailstate,
      }).then((res) => totalissuedispatch({type:"ISSUES",payload:res.data}))
   }, []); 
=======
        role:rolestate
      }).then((res) => wishdispatch({type:"WISH",payload:res.data}))
}, []);
>>>>>>> 70f9ca4993d332b514da6938123c14a44cc36165

    useEffect(() => {
      setTimeout(() => {
          setload(true)
      }, 1000)
  }, [])

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
  // const notifypresent = () => toast("Book already present in wishlist")
  // const notifyissue = (days) => toast(`Book Issued for ${days} days`)
  // const alreadyissued = () => toast("Book already Issued")

    const handlewishlist = (id,name,author,url) => {
      console.log(totalwishstate)
      setReload(!reload)
      if(totalwishstate!=undefined){
      if(totalwishstate.length!=0){
        const checkpres = totalwishstate.find(item => 
          item.bid === id
        )
        console.log(checkpres);
        if(checkpres!=undefined){
          if(checkpres.bid==id) {
            // alert('Book already present in wishlist')
            message('Book already present in wishlist')
            // console.log('Book already present in wishlist')
            return;
          }
        }
      }
    }
    console.log(id);
    console.log(name);
      axios.post(`http://localhost:5000/wishlist/${id}`,{
        email : emailstate,
        role:rolestate,
        wlist : {
          bname : name,
          author : author,
          url : url
        }
      }).then((res) => {
        // setList(res.data)
        console.log(res.data)
        wishdispatch({type:"WISH",payload:res.data})
        // wdispatch({type:"USERW",payload:res.data})
        message('Books added to wishlisht');
        // notifyadded();
      })

      books.find(item => {
        if(item.bid === id){
        wdispatch({type:"USERW",payload:item})
        }
      })
    }



    const handleissue  = (id,rent,name,author,url) => {
      if(days === 0){
        message('Please enter the time period of issue')
        return;
      }

      console.log(totalissuestate)
      setReload(!reload)
      if(totalissuestate!=undefined){
      if(totalissuestate.length!=0){
        const checkpres = totalissuestate.find(item => 
          item.bid == id
        )
        console.log(checkpres);
        if(checkpres!=undefined){
          if(checkpres.bid==id) {
            setDays(0);
            message('Book already Issued')
            // alreadyissued();
            return;
          }
        }
      }
    }
      axios.post(`http://localhost:5000/issue/${id}`,{
        email : emailstate,
        role:rolestate,
        period : days,
        amount : days*rent,
        bname : name,
        author : author,
        url : url
      }).then(res => {
        // console.log(res.data);
        issuedispatch({type:"ISSUE",payload:res.data})
        totalissuedispatch({type:"ISSUES",payload:issuestate})
        message(`Book Issued for ${days} days`)
        // notifyissue(days)
      })

      setDays('0');

      books.find(item => {
        if(item.bid === id){
        idispatch({type:"USERI",payload:item})
        }
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
                              <button onClick={() => handlewishlist(book.bid,book.bname,book.author,book.url)}>Add to Wishlist+ </button>
                              <input className='inps' type="number" placeholder="Issue for (in days)" onChange={(e) => setDays(e.target.value)} />
                              <Tooltip title="Issue book" TransitionComponent={Fade}>
                                <button  onClick={() => handleissue(book.bid,book.rent,book.bname,book.author,book.url)}><BiBookAdd/></button>
                              </Tooltip>
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
                <Reveal effect="fadeInUp">
                    <div className="contents">
                {
                    books.map((book,index) => {
                        return (
                          <div className="main_displayy" key={index}>
                            <div className="card_component">
                              <BiBookHeart className='card-icon' onClick={() => handlewishlist(book.bid,book.bname,book.author,book.url)}/>  
                              <div className="services_data">
                                <img className='images' src={`${book.url}`} />
                              </div>
                              <div className="service_name">{book.bname}</div>
                              <div className="author">{book.author}</div>
                              <div className="card_content">
                                {book.desc}
                              </div>
                              <input className='inps' type="number" placeholder="Issue for (in days)" onChange={(e) => setDays(e.target.value)} />
                              <Tooltip
                               title="Issue book"
                               TransitionComponent={Zoom}
                               >
                              <button  onClick={() => handleissue(book.bid,book.rent,book.bname,book.author,book.url)}><BiBookAdd/></button>
                              </Tooltip>
                            </div>
                          </div>
                        )
                    })
                  }
                </div>
          </Reveal>
                </div>
                </>
          }
    </div>
}
    </>
  )
}

export default Books