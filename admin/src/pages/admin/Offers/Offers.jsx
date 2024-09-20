import React from 'react'
import OffersTable from '../../../components/OffersTable'
import { FaPlusSquare } from 'react-icons/fa'

function Offers() {
  return (

    <div className="flex flex-col w-full gap-5 mx-auto">
    <nav className="my-2">
      <ol className="flex text-[#ff2626]">
     
        <li className="text-3xl font-semibold text-gray-900 mb-6">
          <span>Offers </span>
        </li>
      </ol>
    </nav>
    <hr />
    <a href="/create-offers">
      <button
        type="button"
        className="text-white bg-[#360909] flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
      
        Create Offers
      </button>
    </a>
    <div>
    <OffersTable/>
    </div>

  
    
  </div>
    
  )
}

export default Offers