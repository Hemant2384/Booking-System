import React from 'react'
import { homeObjfour, homeObjone, homeObjthree, homeObjtwo } from './Data'
import InfoSection from '../InfoSection/InfoSection' 
import Landingpage from './Landing'
import Contributors from './Contributors'
import Footer from '../Footer/Footer'
// import { useLocation } from 'react-router'



const Home = () => {
  // const location = useLocation();
  // const user = location.state.email;
  // console.log(user);
    return (      
        <>
           {/* <p>{user}</p> */}
          <InfoSection {...homeObjone}/>
          <InfoSection {...homeObjthree}/>
          {/* <InfoSection {...homeObjtwo}/>
          <InfoSection {...homeObjfour}/> */}
          <Landingpage/>
          <Contributors/>
          <Footer/>
        </>
    )
}

export default Home
