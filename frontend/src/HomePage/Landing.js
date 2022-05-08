import React,{useState} from 'react'
// import { imagelinks } from './Softwaredata'
import { BsBoundingBox} from 'react-icons/bs'
import {CgBrowser} from 'react-icons/cg'
import {RiCodeBoxFill,RiHeartAddFill} from 'react-icons/ri'
import {BiBookAdd} from 'react-icons/bi'
import {MdOutlineRecentActors} from 'react-icons/md'
import {FaGlobe} from 'react-icons/fa'
import './Landing.css'
// import Continue from './Continue'

const Landingpage = () => {

    return (
        // <div className="outerlanding">
        <div className="instructions">
                <div className="instructions_text">
                    How it works
                </div>
                <div className="instruction_icons">
                    <div className="instruction_item">
                         <RiHeartAddFill />
                         <BiBookAdd/>
                         <MdOutlineRecentActors/>                
                    </div>
                    <div className="arrow">
                        <p className="arrow_icon"></p>
                        <p className="arrow_icon2"></p>
                    </div>
                    <div className="t_text">
                    <p>1. Add any book to your wishlist</p>
                    <p>2. Issue any book you want</p>
                    <p>3. View the recent activities</p>
                    </div>
                </div>
            </div>
    // </div>
    )
}

export default Landingpage
