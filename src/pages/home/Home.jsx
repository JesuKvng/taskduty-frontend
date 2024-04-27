import React from 'react'
import {Link } from 'react-router-dom'
import './Home.css'
import heroImg from '../../assets/images/Property 1=Frame 1.png'

const Home = () => {
  return (
    <div className='hero-section container'>
        <div className=' left  d-flex flex-column gap-4'>
          <h1 className='text-xl lh-base'>Manage your Tasks on   <span className='span-text'>TaskDuty</span></h1>
          <p className='text-center  text-lg-start mx-auto mx-lg-0 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl semper porttitor. Nec accumsan.</p>

          <div className='d-flex justify-content-center justify-content-lg-start'>
          <Link to="/alltask"> <button className=' text-white border-0 rounded-3  py-3 px-4 px-lg-5  home-btn'>  Go to My Tasks </button>  </Link>
          </div>
        </div>
        <div className=' right'>
          <img src={heroImg} alt="hero image" />
        </div>
        </div>
  )
}

export default Home