import React, { useState } from 'react';
import AddProperty from '../pages/AddProperty';
import AddOwner from './AddOwner';
import PropertyList from './PropertyList';
import OwnersList from './OwnersList';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('properties');

  return (
    <div className="">
      <div className='justify-center flex'>
        <h1 className="text-2xl font-bold mb-6 "></h1>
      </div>
      <div className='justify-center flex'>
        <div className="mb-4">
          <button
            onClick={() => setActiveTab('properties')}
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'properties' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('owners')}
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'owners' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Owners
          </button>
          
        </div>
      </div>
      {activeTab === 'properties' && <PropertyList />}
      {activeTab === 'owners' && <OwnersList/>}
      
    </div>
  );
};

export default Profile;