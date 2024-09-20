import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { FaImage } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateOffers() {
  const [imageFile, setImageFile] = useState(null);

  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');
  const [description, setDescription] = useState('');

  const onSelectFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('percentage', percentage);
    formData.append('description', description);

    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
    
      const result = await axios.post('http://localhost:8081/api/offers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully:', result.data);

    
      toast.success('Offer created successfully!');

      
      setName('');
      setPercentage('');
      setDescription('');
      setImageFile(null);

    } catch (error) {
      console.error('Error submitting form:', error.response || error);
      
      toast.error('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Percentage"
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
        />

        <div className="flex items-center space-x-2">
          <FaImage className="text-xl text-gray-500" />
          <label className="cursor-pointer">
            <input type="file" accept="image/*" onChange={onSelectFile} hidden />
            <span className="text-blue-600 hover:underline">Choose Image</span>
          </label>
        </div>

        {imageFile && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">Selected Image Preview:</h3>
            <img src={URL.createObjectURL(imageFile)} alt="Selected" className="rounded-md shadow-md mt-2" />
          </div>
        )}

        <Button type="submit" variant="contained" color="primary" className="w-full mt-4">
          Submit Offer
        </Button>
      </form>
      <ToastContainer /> 
    </div>
  );
}

export default CreateOffers;
