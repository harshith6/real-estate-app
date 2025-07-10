import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {assets} from '../assets/assets'

const Landing = () => {
  const navigate = useNavigate();
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <>
    <div className='min-h-screen w-full flex flex-col justify-between bg-gradient-to-br from-blue-400 via-white to-blue-200 relative overflow-hidden' id='Header'>
      {/* Animated gradient background shapes */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 via-blue-300 to-blue-100 rounded-full blur-3xl opacity-60 animate-pulse-slow z-0"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200 via-blue-400 to-blue-600 rounded-full blur-3xl opacity-50 animate-pulse-slow z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-gradient-to-r from-blue-100 via-white to-blue-200 rounded-full blur-2xl opacity-40 z-0"></div>
      {/* Logo at the top */}
      <div className='absolute top-0 left-0 w-full z-10 flex items-center px-8 py-6'>
        {/* <img src={assets.logo} alt="Logo" className="h-14 drop-shadow-xl animate-fade-in" /> */}
      </div>
      {/* Main content */}
      <div className='relative flex flex-col flex-grow justify-center items-center min-h-[80vh]'>
        <div className='flex flex-col items-center'>
          {/* New subtitle above the main header, aligned left */}
          <div className="w-full mb-2">
          <span className="text-sm md:text-base font-semibold text-blue-800 text-left">
            Find your dream Properties with
          </span>
          </div>
          <h1 className='text-5xl sm:text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 drop-shadow-lg mb-12 animate-gradient-x text-center'>
            ANJANADRI <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-800 align-middle">Properties and Solutation</span>
          </h1>
          <div className="flex gap-4 animate-slide-down mb-8">
            <button 
              type="button" 
              onClick={() => handleNavigation('/register')} 
              className="group px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold shadow-lg hover:shadow-blue-500/50 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/30 backdrop-blur-md cursor-pointer active:scale-95 relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <button 
              type="button" 
              onClick={() => handleNavigation('/login')} 
              className="group px-6 py-2 rounded-full bg-white/80 text-blue-700 font-bold shadow-lg hover:shadow-blue-300/50 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 backdrop-blur-md cursor-pointer active:scale-95 relative overflow-hidden"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
          <p className='text-xl md:text-2xl text-blue-900 font-medium mb-10 text-center max-w-2xl drop-shadow'>
            Discover, compare, and connect with the best properties and owners in your city. Experience a new era of real estate with our seamless, modern platform.
          </p>
          {/* New Buyer and Seller buttons at the end */}
          <div className="flex gap-6 mt-8">
            <button
              type="button"
              onClick={() => setShowBuyerModal(true)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-400 text-white font-bold shadow-lg hover:scale-105 transition-all duration-300 border-2 border-white/30 backdrop-blur-md cursor-pointer active:scale-95"
            >
              Buyers (Want to buy land or properties)
            </button>
            <button
              type="button"
              onClick={() => setShowSellerModal(true)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 text-white font-bold shadow-lg hover:scale-105 transition-all duration-300 border-2 border-white/30 backdrop-blur-md cursor-pointer active:scale-95"
            >
              Sell (Sell land or properties)
            </button>
          </div>
        </div>
      </div>
      <footer className="relative z-10 bg-transparent text-center p-4 text-sm text-blue-900/80">
        © 2025 MyRealEstate Company | All rights reserved.
      </footer>
      {showBuyerModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
        onClick={() => setShowBuyerModal(false)}
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Buyer Requirements</h2>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Name" className="border rounded px-3 py-2" required />
        <input type="text" placeholder="Contact Number" className="border rounded px-3 py-2" required />
        <input type="text" placeholder="Location" className="border rounded px-3 py-2" required />
        <input type="text" placeholder="Land Measurement" className="border rounded px-3 py-2" required />
        <textarea placeholder="Other Requirements" className="border rounded px-3 py-2" rows={3} />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}
      {showSellerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setShowSellerModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-orange-700">Seller Requirements</h2>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Name" className="border rounded px-3 py-2" required />
              <input type="text" placeholder="Contact Number" className="border rounded px-3 py-2" required />
              <input type="text" placeholder="Location" className="border rounded px-3 py-2" required />
              <input type="text" placeholder="Land/Property Details" className="border rounded px-3 py-2" required />
              <textarea placeholder="Other Requirements" className="border rounded px-3 py-2" rows={3} />
              <button
                type="submit"
                className="bg-orange-600 text-white rounded px-4 py-2 font-semibold hover:bg-orange-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
    
  )
}

export default Landing
