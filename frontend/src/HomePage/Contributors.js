import React from 'react'
import { Link } from 'react-router-dom'
import './Contributors.css'
import {AiFillFacebook,AiFillGithub,AiFillLinkedin,AiFillInstagram} from 'react-icons/ai'
import Fade from 'react-reveal/Fade';

const Contributors = () => {
  return (
    <div className='contri'>
        <Fade left>
        <div className='card'>
            <div className="side-bar">
                <img className='contri-image' src='https://i.pravatar.cc/125'/>
                <ul className='social-list'> 
                <li className='social-item'><Link className='social-link' to=''><AiFillFacebook/></Link></li>
                <li className='social-item'><Link className='social-link' to=''><AiFillGithub/></Link></li>
                <li className='social-item'><Link className='social-link' to=''><AiFillLinkedin/></Link></li> 
                <li className='social-item'><Link className='social-link' to=''><AiFillInstagram/></Link></li> 
                </ul>    
            </div>
            <div className="profile-main">
            <h2 className='contri-name'>
            Hemant Jain
            </h2>
            <p className='profile-position'>
                Web developer
            </p>
            <p className='contri-detail'>
            Is there a way to loop through the array to check whether a particular username value already exists and if it does do nothing, but if it doesn't to add a new object to the array with said username
            </p>
            </div>
        </div>
        </Fade>
        <Fade right>
        <div className='card'>
            <div className="side-bar">
                <img className='contri-image' src='https://i.pravatar.cc/125'/>
                <ul className='social-list'> 
                <li className='social-item'><Link className='social-link' to=''><AiFillFacebook/></Link></li>
                <li className='social-item'><Link className='social-link' to=''><AiFillGithub/></Link></li>
                <li className='social-item'><Link className='social-link' to=''><AiFillLinkedin/></Link></li> 
                <li className='social-item'><Link className='social-link' to=''><AiFillInstagram/></Link></li> 
                </ul>    
            </div>
            <div className="profile-main">
            <h2 className='contri-namee'>
            Vedang Pancholi
            </h2>
            <p className='profile-position'>
                Web developer
            </p>
            <p className='contri-detail'>
            Is there a way to loop through the array to check whether a particular username value already exists and if it does do nothing, but if it doesn't to add a new object to the array with said username
            </p>
            </div>
        </div>
        </Fade>
    </div>
  )
}

export default Contributors