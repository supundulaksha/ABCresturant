import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuTable from '../../../components/MenuTable';
import { toast, Toaster } from 'react-hot-toast';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/menu/${id}`);
      fetchMenuItems();
      toast.success('Menu item deleted successfully!', {
        position: 'center',
      });
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  const handleEdit = (menuItem) => {
    setEditItem(menuItem);
  };

  const handleSaveItem = async (itemData) => {
    if (editItem) {
      try {
        await axios.put(`http://localhost:8081/api/menu/${editItem.id}`, itemData);
        fetchMenuItems();
        setEditItem(null);
      } catch (error) {
        console.error('Failed to update menu item:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:8081/api/menu', itemData);
        fetchMenuItems();
      } catch (error) {
        console.error('Failed to add menu item:', error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
       <Toaster />
      <nav className="my-2">
        <ol className="flex text-[#ff2626]">
        
          <li className="text-3xl font-semibold text-gray-900 mb-6">
            <span>Menu </span>
          </li>
        </ol>
      </nav>
      <hr />
      <a href="/create-menu">
        <button
          type="button"
          className="text-white bg-[#360909] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          
          Add New Menu Item
        </button>
      </a>
      <div>
        <MenuTable
          menuItems={menuItems}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* Create or Update Form */}
      
    </div>
  );
}

export default Menu;
