import React,{createContext, useReducer} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Home from './Home';
import Navbar from './Navbar/Navbar';
import Login from './LoginandSignup/Login';
// import {Switch} from 'react-router'
import Signup from './LoginandSignup/Signup';
import Profile from './Dashboard/Profile';
import { initialState,userreducer,emailreducer,wishlishtreducer, wishinitialState, emailinitialState, issuereducer, issueinitialState, roleinitialState,rolereducer,bookreducer ,bookinitialState} from './reducer/UseReducer';
import Books from './Books/Books';
import './App.css'


export const AppContext = createContext(false);
export const UserContext = createContext('');
export const WishContext = createContext([]);
export const IssueContext = createContext([]);
export const RoleContext = createContext('');
export const BookContext = createContext([]);

const App = () => {

  const [state,dispatch] = useReducer(userreducer,initialState)
  const [emailstate,emaildispatch] = useReducer(emailreducer,emailinitialState)
  const [wishstate,wishdispatch] = useReducer(wishlishtreducer,wishinitialState)
  const [issuestate,issuedispatch] = useReducer(issuereducer,issueinitialState)
  const [rolestate,roledispatch] = useReducer(rolereducer,roleinitialState)
  const [bookstate,bookdispatch] = useReducer(bookreducer,bookinitialState)
  console.log(state)
  return (
    <>
    <AppContext.Provider value={{state,dispatch}}>
    <UserContext.Provider value={{emailstate,emaildispatch}}>
    <WishContext.Provider value={{wishstate,wishdispatch}}>
    <IssueContext.Provider value={{issuestate,issuedispatch}}>
    <RoleContext.Provider value={{rolestate,roledispatch}}>
    <BookContext.Provider value={{bookstate,bookdispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/books" element={<Books/>}/>
    </Routes>
    </BrowserRouter>
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