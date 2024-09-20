import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const MenuTable = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
    ingredients: [],
    categoryId: "",
    offerStatus: false,
    offerClickPercentage: 0,
    finalPrice: 0,
  });
  const [newIngredient, setNewIngredient] = useState("");
  const [image, setImage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editForm.price && editForm.offerClickPercentage) {
      const price = parseFloat(editForm.price);
      const percentage = parseFloat(editForm.offerClickPercentage);
      const finalPrice = price - price * (percentage / 100);
      setEditForm((prevForm) => ({ ...prevForm, finalPrice }));
    }
  }, [editForm.price, editForm.offerClickPercentage]);

  const fetchMenus = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/menus");
      setMenus(response.data);
    } catch (error) {
      toast.error("Failed to fetch menu items");
      console.error("Fetch menus error:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error("Fetch categories error:", error);
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setEditForm({
      name: menu.name,
      price: menu.price,
      description: menu.description,
      ingredients: menu.ingredients,
      categoryId: menu.category ? menu.category.id : "",
      offerStatus: menu.offerStatus || false,
      offerClickPercentage: menu.offerClickPercentage || 0,
      finalPrice: menu.finalPrice || 0,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setEditForm((prevForm) => ({
      ...prevForm,
      offerStatus: !prevForm.offerStatus,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveEdit = async () => {
    if (!editingMenu) return;

    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("price", parseFloat(editForm.price));
    formData.append("description", editForm.description);
    formData.append("ingredients", JSON.stringify(editForm.ingredients));
    formData.append("categoryId", editForm.categoryId);
    formData.append("offerStatus", editForm.offerStatus);
    formData.append(
      "offerClickPercentage",
      parseFloat(editForm.offerClickPercentage)
    );
    formData.append("finalPrice", editForm.finalPrice);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `http://localhost:8081/api/menus/${editingMenu.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Menu item updated successfully!");
      setEditingMenu(null);
      fetchMenus();
    } catch (error) {
      toast.error("Failed to update menu item");
      console.error("Update error:", error);
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient) {
      setEditForm((prevForm) => ({
        ...prevForm,
        ingredients: [...prevForm.ingredients, newIngredient],
      }));
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setEditForm((prevForm) => ({
      ...prevForm,
      ingredients: prevForm.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleDelete = (id) => {
    setMenuToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (menuToDelete) {
      try {
        await axios.delete(`http://localhost:8081/api/menus/${menuToDelete}`);
        toast.success("Menu item deleted successfully!");
        fetchMenus();
        setShowConfirmModal(false);
        setMenuToDelete(null);
      } catch (error) {
        toast.error("Failed to delete menu item");
        console.error("Delete error:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setMenuToDelete(null);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white">
        <table className="w-full text-lg text-left text-gray-600 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Offer</th>
              <th className="py-3 px-4 border-b">Final Price</th>
              <th className="py-3 px-4 border-b">Description</th>
              <th className="py-3 px-4 border-b">Ingredients</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id}>
                <td className="py-2 px-4 border-b">
                  <img
                    src={`http://localhost:8081/uploads/images/${menu.imageUrl}`}
                    alt={menu.name}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b">{menu.name}</td>
                <td className="py-2 px-4 border-b">${menu.price}</td>
                <td className="py-2 px-4 border-b">
                  {menu.offerStatus ? `${menu.offerClickPercentage}%` : "N/A"}
                </td>
                <td className="py-2 px-4 border-b">${menu.finalPrice}</td>
                <td className="py-2 px-4 border-b">{menu.description}</td>
                <td className="py-2 px-4 border-b">
                  {menu.ingredients.join(", ")}
                </td>
                <td className="py-2 px-4 border-b">
                  {menu.category ? menu.category.categoryName : "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(menu)}
                    className="px-4 py-2 text-blue-500 rounded mr-2"
                  >
                    <FaEdit className="inline-block mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="px-4 py-2 text-red-500 rounded"
                  >
                    <FaTrash className="inline-block mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Menu Modal */}
        {editingMenu && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
              <form className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    placeholder="Price"
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    placeholder="Description"
                    rows="3"
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="ingredients"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ingredients
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      placeholder="Add ingredient"
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={handleAddIngredient}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="mt-2">
                    {editForm.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center py-1"
                      >
                        {ingredient}
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(index)}
                          className="text-red-500"
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={editForm.categoryId}
                    onChange={handleEditChange}
                    className="p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={editForm.offerStatus}
                      onChange={handleCheckboxChange}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Offer Status</span>
                  </label>
                </div>
                {editForm.offerStatus && (
                  <div className="mb-4">
                    <label
                      htmlFor="offerClickPercentage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Offer Click Percentage
                    </label>
                    <input
                      type="number"
                      id="offerClickPercentage"
                      name="offerClickPercentage"
                      value={editForm.offerClickPercentage}
                      onChange={handleEditChange}
                      placeholder="Offer Click Percentage"
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditingMenu(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirm Delete Modal */}
        {showConfirmModal && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete this menu item? This action
                cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuTable;
