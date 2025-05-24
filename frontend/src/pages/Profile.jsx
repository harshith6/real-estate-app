import React, { useState } from 'react';
import AddProperty from '../pages/AddProperty';
import AddOwner from './AddOwner';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('add-properties');

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-4">
        <button
          onClick={() => setActiveTab('add-properties')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'add-properties' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Add Property
        </button>
        <button
          onClick={() => setActiveTab('add-owner')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'my-owner' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Add Owner
        </button>
        <button
          onClick={() => setActiveTab('my-properties')}
          className={`px-4 py-2 rounded ${activeTab === 'my-properties' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          My Properties
        </button>
      </div>

      {activeTab === 'add-properties' && <AddProperty />}
      {activeTab === 'add-owner' && <AddOwner/>}
      {activeTab === 'my-properties' && <p>Coming soon: My Properties List</p>}
    </div>
  );
};

export default Profile;