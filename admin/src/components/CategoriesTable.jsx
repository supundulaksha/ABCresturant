import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState({
    categoryName: "",
    imageUrl: "",
    imageFile: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setCategoryDetails({
      categoryName: category.categoryName,
      imageUrl: category.imageUrl,
      imageFile: null,
    });
    setEditingCategoryId(category.id);
  };

  const handleImageChange = (e) => {
    setCategoryDetails({ ...categoryDetails, imageFile: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryDetails({ ...categoryDetails, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryDetails.categoryName);
    if (categoryDetails.imageFile)
      formData.append("image", categoryDetails.imageFile);

    try {
      await axios.put(
        `http://localhost:8081/api/categories/${editingCategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const response = await axios.get("http://localhost:8081/api/categories");
      setCategories(response.data);
      setEditingCategoryId(null); 
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8081/api/categories/${categoryId}`);
      const response = await axios.get("http://localhost:8081/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCancel = () => {
    setEditingCategoryId(null);
  };

  return (
    <>
      <div className="relative w-[500px] overflow-x-auto shadow-lg sm:rounded-lg bg-white">
              <table className="w-full text-sm text-left text-gray-600 border-collapse">
              <thead className="text-xs  text-gray-700 uppercase bg-gray-100">
          <tr>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Category Name</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 border-[1px] border-gray-200 ">
                <td className="py-4 px-4">
                  <img
                    src={`http://localhost:8081/uploads/images/${category.imageUrl}`}
                    alt={category.categoryName}
                    className="object-cover h-[100px] w-[100px] rounded"
                  />
                </td>
                <td className="py-4 px-4 font-medium">
                  {category.categoryName}
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2"
                  >
                    <FaEdit className="inline-block mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-3 py-2 ml-2"
                  >
                    <FaTrash className="inline-block mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCategoryId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={categoryDetails.categoryName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesTable;
