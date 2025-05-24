import React, { useState } from 'react';
import AddProperty from '../pages/AddProperty';
import AddOwner from './AddOwner';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('add-properties');

  return (
    <div className="p-4 mx-auto max-w-md">
      <div className='justify-center flex'>
        <h1 className="text-2xl font-bold mb-6 ">Admin Dashboard</h1>
      </div>
      <div className='justify-center flex'>
        <div className="mb-4">
          <button
            onClick={() => setActiveTab('add-properties')}
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'add-properties' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Add Property
          </button>
          <button
            onClick={() => setActiveTab('add-owner')}
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'add-owner' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Add Owner
          </button>
          
        </div>
      </div>
      {activeTab === 'add-properties' && <AddProperty />}
      {activeTab === 'add-owner' && <AddOwner/>}
      
    </div>
  );
};

export default Profile;