import React from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';

const StatCard = ({ value, label }) => (
  <div>
    <p className="text-4xl font-medium text-gray-800">{value}</p>
    <p>{label}</p>
  </div>
);

StatCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const About = () => {
  const stats = [
    { value: '10+', label: 'Years of Excellence' },
    { value: '12+', label: 'Projects Completed' },
    { value: '20+', label: 'mn. sq. ft. Delivered' },
    { value: '25+', label: 'Ongoing Projects' },
  ];

  return (
    <div 
      className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden"
      id="About"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        About <span className="underline underline-offset-4 decoration-1 font-light">Our Brand</span>
      </h1>
      <p className="text-gray-500 max-w-80 text-center mb-8">Passionate About Properties</p>
      
      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
        <img 
          src={assets.brand_logo} 
          alt="Brand Logo"  
          className="w-full sm:w-1/2 max-w-lg"
        />
        
        <div className="flex flex-col items-center md:items-start mt-10 text-gray-600">
          <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
          
          <p className="my-10 max-w-lg leading-relaxed">
            We are dedicated to providing exceptional real estate solutions, combining years of expertise 
            with innovative approaches to meet your property needs. Our commitment to excellence and 
            customer satisfaction has made us a trusted name in the industry.
          </p>
          
          <button className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;