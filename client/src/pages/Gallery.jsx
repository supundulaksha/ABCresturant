import React, { useEffect, useState } from 'react';
import axios from 'axios';
import about from '../assets/Images/gallery.jpg'; // Make sure this path is correct

function Gallery() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:8081/api/menus"),
          axios.get("http://localhost:8081/api/categories"),
        ]);

        setMenus(menusResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const renderMenuItemsByCategory = (categoryId) => {
    const filteredMenus = menus.filter(
      (menu) => menu.category && menu.category.id === categoryId
    );

    return filteredMenus.length > 0 ? (
      filteredMenus.map((menu) => (
        <div
          key={menu.id}
          className="p-4 border rounded-lg shadow-md bg-[#f1f1f1] hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={`http://localhost:8081/uploads/images/${menu.imageUrl}`}
            className="w-full h-[300px] object-cover rounded-lg"
            alt={menu.name}
          />
          <h3 className="text-lg font-semibold mt-2">{menu.name}</h3>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No menu items available for this category.</p>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {/* Background Image Section */}
      <section
        style={{ backgroundImage: `url(${about})` }}
        className="bg-cover bg-center bg-no-repeat py-60 h-60"
      >
        {/* Optional: Add content or overlay if needed */}
      </section>

      <div className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center text-[#800000]">
            GALLERY
          </h2>
          <div className="mb-10 text-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`mx-2 py-2 px-4 rounded ${selectedCategory === null ? 'bg-[#800000] text-white' : 'bg-[#f1f1f1] text-black'}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`mx-2 py-2 px-4 rounded ${selectedCategory === category.id ? 'bg-[#800000] text-white' : 'bg-[#f1f1f1] text-black'}`}
              >
                {category.categoryName}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedCategory === null
              ? categories.flatMap(category => renderMenuItemsByCategory(category.id))
              : renderMenuItemsByCategory(selectedCategory)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
