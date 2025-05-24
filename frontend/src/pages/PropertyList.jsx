import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({ location: '', minPrice: '', maxPrice: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        } else {
          fetchProperties();
        }
      }, [filters]);

    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem('token');
            const query = new URLSearchParams();
            if (filters.location) query.append('location', filters.location);
            if (filters.minPrice) query.append('minPrice', filters.minPrice);
            if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);

            const response = await axios.get(`http://localhost:5000/api/property?${query.toString()}`, {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            });
            
            console.log('Fetched properties:', response.data);
            // Make sure we're setting the properties array from the response
            setProperties(response.data.properties || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
            if (error.response?.status === 401) {
            navigate('/login');
            }
        }
    };

    const handleFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Property Listings</h1>
                <div className="bg-white rounded shadow p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(properties) && properties.length > 0 ? (
                    properties.map((property) => (
                        <div key={property.id} className="border rounded shadow p-4 bg-white">
                        {property.images && property.images.length > 0 && (
                            <img
                            src={`http://localhost:5000/uploads/${property.images[0]}`}
                            alt={property.title}
                            className="w-full h-40 object-cover rounded mb-2"
                            />
                        )}
                        <h2 className="text-lg font-semibold">{property.title}</h2>
                        <p className="text-gray-600">{property.location}</p>
                        <p className="text-blue-600 font-bold">₹ {property.price}</p>
                        </div>
                    ))
                    ) : (
                    <p className="col-span-3 text-center text-gray-500">No properties found</p>
                    )}
                </div>
            </div>
        </div>
    );

}


export default PropertyList;