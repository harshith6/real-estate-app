import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        <img src={assets.logo} alt="Logo" />
        <img
          src={assets.menu_icon}
          className="md:hidden w-7 cursor-pointer"
          onClick={handleMobileMenuToggle}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          showMobileMenu ? 'fixed w-full' : 'h-0 w-0'
        } right-0 top-0 bottom-0 
        overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-end p-6">
          <img
            src={assets.cross_icon}
            className="w-6 cursor-pointer"
            onClick={handleMobileMenuToggle}
            alt="Close"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;