import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await api.get('/owners'); // Adjust baseURL in axios if needed
        setOwners(res.data.owners || []);
      } catch (error) {
        setOwners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOwners();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Owners List</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : 
        owners.length === 0 ?
        (
          <div className="text-center text-gray-500">No owners found.</div>
        ) : 
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {owners.map((owner) => (
              <div key={owner.id} className="border rounded shadow p-4 bg-white flex flex-col">
                
                <h2 className="text-lg font-semibold mb-1">{owner.name}</h2>
                <p className="text-gray-600 mb-1">Location: {owner.location}</p>
                <p className="text-gray-600 mb-1">Face:{owner.face}</p>
                <p className="text-gray-600 mb-1">Contact: {owner.contact}</p>
                <p className="text-gray-600 mb-1">Measurement: {owner.measurment}</p>
                <p className="text-blue-600 font-bold mb-1">Price: ₹ {owner.price}</p>
            
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnersList;