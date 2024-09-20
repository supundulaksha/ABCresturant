import React, { useState, useEffect } from 'react';


import CategoriesTable from '../../../components/CategoriesTable';

function AllCategory() {
 
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <nav className="my-2">
        <ol className="flex text-[#ff2626]">
          
          <li className="text-3xl font-semibold text-gray-900 mb-6">
            <span>Categories</span>
          </li>
        </ol>
      </nav>
      <hr />
      <a href="/create-category">
        <button
          type="button"
          className="text-white bg-[#360909] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
      
          Create Category
        </button>
      </a>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
        
        <CategoriesTable/>
      </div>

      
      
    </div>
  );
}

export default AllCategory;
