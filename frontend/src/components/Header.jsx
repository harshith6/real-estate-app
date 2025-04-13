import React from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className='min-h-screen bg-4 bg-cover bg-center flex items-center w-full overflow-hidden'
     style={{backgroundImage:"url('/header.png')"}} 
    id='Header'>
        <Navbar/>

        <div className='container text-center mx-autopy-4 px-6 md:px-20 lg:px-32 text-white'>
            <h2 className='text-5xl sm:text-6xl md:text-[82px] inline-block
            max-w-mxl font-semibold'>
                Explore Homes that fit your dreams 
            </h2>
            <div className='space-x-6 mt-16'>
            <button 
                    onClick={() => handleNavigation('/register')}
                    className='border border-white bg-blue-500 py-3 px-8 rounded hover:bg-blue-600 transition-colors'>
                    Register
                </button>
                <button 
                    onClick={() => handleNavigation('/login')}
                    className='border border-white bg-blue-500 py-3 px-8 rounded hover:bg-blue-600 transition-colors'>
                    Login
                </button>
            </div>
        </div>

    </div>
  )

}

export default Header