import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import { useContext } from 'react';
import { UserContext } from './UserContext';



const AddOwner = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [form, setForm] = useState({
        name: '',
        location: '',
        price: '',
        measurment: '',
        contact: '',
        face: '',
        userId: user.id || '', // Assuming user.id is available
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
    if (e.target.type === 'file') {
        setForm({ ...form, face: e.target.files[0] });
    } else {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        const data = new FormData();
        data.append('name', form.name);
        data.append('location', form.location);
        data.append('price', form.price);
        data.append('measurment', form.measurment);
        data.append('contact', form.contact);
        data.append('face', form.face);
        data.append('userId', form.userId);

        try {
            await api.post('/owners', data, {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            });
            setMessage('Owner added successfully!');
            setForm({
                name: '',
                location: '',
                price: '',
                measurment: '',
                contact: '',
                userId: '',
                face: ''
            });
        } catch (error) {
            setMessage('Failed to add owner');
        }
   
    };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Owner</h2>
      {message && <p className="text-center mb-2">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Owner Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="measurment"
          placeholder="Measurement"
          value={form.measurment}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
        type="text"
        name="face"
        placeholder="Face"
        value={form.face}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Owner
        </button>
      </form>
    </div>
  );
};

export default AddOwner;