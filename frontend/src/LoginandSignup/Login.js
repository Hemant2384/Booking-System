import React, { useMemo } from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { AppContext, GenderContext, RoleContext, UserContext, UserNameContext } from "../App";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
import { ToastContainer, toast } from "react-toastify";
import Footer from '../Footer/Footer';
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const { state, dispatch } = useContext(AppContext);
  const { emailstate, emaildispatch } = useContext(UserContext);
  const { rolestate, roledispatch } = useContext(RoleContext);
  const {ustate,udispatch} = useContext(UserNameContext)
  const {gstate,gdispatch} = useContext(GenderContext)
  const { promiseInProgress } = usePromiseTracker();
  // const[name,setName] = useState('');
  // const[loading,setLoadin
  const [email, setEmail] = useState("Enter your email");
  const [load, setload] = useState(false);
  const [password, setPassword] = useState("Enter your Password");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();
  // localStorage.getItem('token')

  //   useEffect(() => {

  // }, [])

  // toast.warn('Please enter the password', {
  // position: "top-center",
  // autoClose: 5000,
  // hideProgressBar: false,
  // closeOnClick: true,
  // pauseOnHover: true,
  // draggable: true,
  // progress: undefined,
  // });

  const notifynotfound = (message) =>
    toast.warn(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:"light"
    });
  const loggedin = (message) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:"light"
    });
  // const loggedin= () => toast("Succesfully logged in")

  const handlesubmit = (e) => {
    e.preventDefault();
  };

  const handleclick = (e) => {

    // useMemo(() => {
    //   console.log(emailstate);
    // },[emailstate])
    // e.preventDefault();
    setload(true);
      trackPromise(axios
        .post("http://localhost:5000/login", {
          email,
          password,
          role,
        })
        .then((res) => {
          console.log(res.data.user);
          dispatch({ type: "USER", payload: true });
          emaildispatch({ type: "EMAIL", payload: res.data.user.email });
          roledispatch({ type: "ROLE", payload: res.data.user.role });
          gdispatch({ type: "GENDER", payload: res.data.user.gender });
          udispatch({ type: "USERNAME", payload: res.data.user.name });
          // loggedin();
          loggedin('Succesfully logged in')
          navigate("/profile", {
            state: {
              role: role,
              email: email,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          // alert('User not found')
          notifynotfound('User not found')
        }))
    setTimeout(() => {
      setload(false);
    }, 6000);
    // console.log(emailstate);
  };

  // const handleclickk = () => {
  //   setEmail('')
  // }

  return (
    <>
      {promiseInProgress === true ? (
        <>
          <div
            className='loader'>
            <ReactLoading
            width="10em" height="10em"
            className="loader"
            type={"spin"}
            color="#1D1A54"
          />
          </div>
        </>
      ) : (
        <>
          <div className="Login">
            <div className="heading">LOGIN</div>
            <form onSubmit={handlesubmit}>
              <label className="labels" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {email === "" && <p className="alert">Please enter your email</p>}
              <label className="labels" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password === "" && (
                <p className="alert">Please enter your Password</p>
              )}
              <label className="labels" htmlFor="Role">
                Role
              </label>
              <select
                name="roles"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="basic">Basic</option>
              </select>
              <button onClick={handleclick}>Login</button>
              <p className="small">
                Do not have a Account? <Link to="/register">Sign up</Link>
              </p>
            </form>
          </div>
          <Footer/>
        </>
      )}
    </>
  );
};

export default Login;
