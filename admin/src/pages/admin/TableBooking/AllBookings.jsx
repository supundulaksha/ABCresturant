import React from 'react'
import BookingTable from '../../../components/Bookingtable'

function AllBookings() {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
    <nav className="my-2">
      <ol className="flex text-[#ff2626]">
       
        <li className="text-3xl font-semibold text-gray-900 mb-6">
          <span>Reservation Table </span>
        </li>
      </ol>
    </nav>
    <hr />
    <a href="/create-table">
      <button
        type="button"
        className="text-white bg-[#800000] flex items-center gap-2 hover:bg-[#fff] hover:text-[#800000] hover:border-[#800000] hover:border-1 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border border-transparent"
      >
     
        Booking Table
      </button>
    </a>
    <div>
     <BookingTable/>
    </div>
    </div>
  )
}

export default AllBookings