import React, { useState } from 'react';
import axios from 'axios';

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8081/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Category created:', response.data);
      setUploadedImages((prev) => [...prev, response.data]);
      setCategoryName('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full border border-gray-300 rounded-md shadow-sm file:border-none file:p-2 file:mr-4 file:rounded-md file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
            <img src={imagePreview} alt="Selected" className="w-full h-64 object-cover rounded-md shadow-sm" />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>

      {/* Uploaded Images */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Uploaded Images</h2>
        <div className="grid grid-cols-2 gap-4">
          {uploadedImages.map((imageData, index) => (
            <div key={index} className="border border-gray-300 rounded-md overflow-hidden shadow-sm">
              <img
                src={`http://localhost:8081/uploads/${imageData.imageUrl}`}
                alt={imageData.categoryName}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-medium">{imageData.categoryName}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;
