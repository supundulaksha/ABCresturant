import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreateMenu = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [ingredientInput, setIngredientInput] = useState("");
  const [offerStatus, setOfferStatus] = useState(false);
  const [offerClickPercentage, setOfferClickPercentage] = useState("0");
  const [finalPrice, setFinalPrice] = useState("");

  useEffect(() => {
    // Fetch categories for the dropdown
    axios
      .get("http://localhost:8081/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    // Calculate final price based on offer
    if (price && offerClickPercentage) {
      const discount = (price * offerClickPercentage) / 100;
      setFinalPrice((price - discount).toFixed(2));
    } else {
      setFinalPrice(price);
    }
  }, [price, offerClickPercentage, offerStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !price ||
      !description ||
      ingredients.length === 0 ||
      !categoryId ||
      !image
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("ingredients", ingredients.join(","));
    formData.append("categoryId", categoryId);
    formData.append("image", image);
    formData.append("offerStatus", offerStatus);
    formData.append("offerClickPercentage", offerClickPercentage || "0");
    formData.append("finalPrice", finalPrice || price);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/menus",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Menu item created successfully!");
        resetForm();
      }
    } catch (error) {
      toast.error("Failed to create menu item");
      console.error(error);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setIngredients([]);
    setCategoryId("");
    setImage(null);
    setOfferStatus(false);
    setOfferClickPercentage("0");
    setFinalPrice("");
  };

  const handleAddIngredient = () => {
    if (ingredientInput) {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create Menu Item
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Ingredients</label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter ingredient"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <ul className="list-disc pl-5">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Offer Status</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={offerStatus}
                onChange={(e) => setOfferStatus(e.target.checked)}
                className="mr-2"
              />
              <span className={offerStatus ? "text-green-600" : "text-gray-600"}>
                {offerStatus ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {offerStatus && (
            <>
              <div>
                <label className="block text-gray-700">Offer Click Percentage</label>
                <input
                  type="number"
                  value={offerClickPercentage}
                  onChange={(e) => setOfferClickPercentage(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter discount percentage"
                />
              </div>

              <div>
                <label className="block text-gray-700">Final Price</label>
                <input
                  type="text"
                  value={finalPrice}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Create Menu Item
        </button>
      </form>

      {/* Include ToastContainer for toast notifications */}
      <Toaster />
    </div>
  );
};

export default CreateMenu;
