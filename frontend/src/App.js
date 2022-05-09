import React,{createContext, useReducer} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Home from './HomePage/Home';
import Navbar from './Navbar/Navbar';
import Login from './LoginandSignup/Login';
// import {Switch} from 'react-router'
import Signup from './LoginandSignup/Signup';
import Profile from './Dashboard/Profile';
import { initialState,userreducer,emailreducer,wishlishtreducer, wishinitialState, emailinitialState, issuereducer, issueinitialState, roleinitialState,rolereducer,bookreducer ,bookinitialState, totalwishinitialState, totalwishlishtreducer, totalissueinitialState, totalissuetreducer, wreducer, winitialState, ireducer, iinitialState, ginitialState, guserreducer, uuserreducer, uinitialState} from './reducer/UseReducer';
import Books from './Books/Books';
import './App.css'
// import Footer from './Footer/Footer';
import ScrollToTop from './Scrolltotop';
import GlobalStyle from './globalStyles';


export const AppContext = createContext(false);
export const UserContext = createContext('');
export const NameContext = createContext('');
export const GenderContext = createContext('');
export const UserNameContext = createContext('');
export const WishContext = createContext([]);
export const IssueContext = createContext([]);
export const RoleContext = createContext('');
export const BookContext = createContext([]);
export const WContext = createContext([]);
export const IContext = createContext([]);
export const TotalWishContext = createContext([]);
export const TotalIssueContext = createContext([]);

const App = () => {

  const [state,dispatch] = useReducer(userreducer,initialState)
  const [ustate,udispatch] = useReducer(uuserreducer,uinitialState)
  const [gstate,gdispatch] = useReducer(guserreducer,ginitialState)
  const [emailstate,emaildispatch] = useReducer(emailreducer,emailinitialState)
  const [wishstate,wishdispatch] = useReducer(wishlishtreducer,wishinitialState)
  const [issuestate,issuedispatch] = useReducer(issuereducer,issueinitialState)
  const [rolestate,roledispatch] = useReducer(rolereducer,roleinitialState)
  const [bookstate,bookdispatch] = useReducer(bookreducer,bookinitialState)
  const [totalwishstate,totalwishdispatch] = useReducer(totalwishlishtreducer,totalwishinitialState)
  const [totalissuestate,totalissuedispatch] = useReducer(totalissuetreducer,totalissueinitialState)
  const [wstate,wdispatch] = useReducer(wreducer,winitialState)
  const [istate,idispatch] = useReducer(ireducer,iinitialState)


  console.log(state)
  return (
    <>
    <AppContext.Provider value={{state,dispatch}}>
    <UserContext.Provider value={{emailstate,emaildispatch}}>
    <WishContext.Provider value={{wishstate,wishdispatch}}>
    <IssueContext.Provider value={{issuestate,issuedispatch}}>
    <RoleContext.Provider value={{rolestate,roledispatch}}>
    <BookContext.Provider value={{bookstate,bookdispatch}}>
    <TotalWishContext.Provider value={{totalwishstate,totalwishdispatch}}>
    <TotalIssueContext.Provider value={{totalissuestate,totalissuedispatch}}>
    <WContext.Provider value={{wstate,wdispatch}}>
    <IContext.Provider value={{istate,idispatch}}>
    <UserNameContext.Provider value={{ustate,udispatch}}>
    <GenderContext.Provider value={{gstate,gdispatch}}>
    <BrowserRouter>
    <Navbar/>
    <ScrollToTop/>
    <GlobalStyle/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/books" element={<Books/>}/>
    </Routes>
    </BrowserRouter>
    </GenderContext.Provider>
    </UserNameContext.Provider>
    </IContext.Provider>
    </WContext.Provider>
    </TotalIssueContext.Provider>
    </TotalWishContext.Provider>
    </BookContext.Provider>
    </RoleContext.Provider>
    </IssueContext.Provider>
    </WishContext.Provider>
    </UserContext.Provider>
    </AppContext.Provider>
    </>
  )
}

export default App