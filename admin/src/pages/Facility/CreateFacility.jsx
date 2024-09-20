import axios from 'axios';
import React, { useState } from 'react'

function CreateFacility() {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
  
      try {
        const response = await axios.post('http://localhost:8081/api/facilities/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Facility created:', response.data);
        setName('');
        setImage(null);
      } catch (error) {
        console.error('Error creating facility:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto bg-white rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Facility Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Create Facility
        </button>
      </form>
    );
  };
  

export default CreateFacility