import React, { useState } from 'react';
import about from '../assets/Images/about.jpg';

const facilitiesData = [
  { id: 1, name: 'Free Wi-Fi', description: 'Enjoy free high-speed internet while dining with us.' },
  { id: 2, name: 'Outdoor Seating', description: 'Relax and dine in our beautiful outdoor seating area.' },
  { id: 3, name: 'Private Dining Rooms', description: 'Exclusive rooms available for private gatherings.' },
  { id: 4, name: 'Kids Play Area', description: 'A safe and fun area for children to play.' },
  { id: 5, name: 'Wheelchair Accessible', description: 'Our restaurant is fully accessible for all guests.' },
  { id: 6, name: 'Valet Parking', description: 'Convenient valet parking service available.' },
];

function About() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFacilities = facilitiesData.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Background Image Section */}
      <section
        style={{ backgroundImage: `url(${about})` }}
        className="bg-cover bg-center bg-no-repeat py-60 h-60"
      >
        {/* Optional: Add content or overlay if needed */}
      </section>

      <div className="bg-gray-100 py-20 px-8">
        <div className="container mx-auto max-w-5xl">
          
          {/* Title */}
          <h1 className="text-5xl font-bold mb-12 text-left text-[#800000]">About ABC Restaurant</h1>

          {/* Sri Lanka Section */}
          <section className="mb-16">
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-left">
              Nestled in the heart of Sri Lanka , ABC Restaurant showcases the country’s rich culinary heritage. We offer a vibrant dining experience, capturing the authentic flavors of Sri Lankan cuisine, served with passion and respect for tradition.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center items-start text-lg text-gray-700">
                <p className="mb-4">
                  Our menu celebrates the unique flavors from across Sri Lanka, featuring dishes crafted with fresh, locally sourced ingredients. Whether it’s a spicy seafood curry from the coast or a savory rice dish, each meal is thoughtfully prepared.
                </p>
                <ul className="list-disc list-inside mt-4">
                  <li>Authentic Sri Lankan Cuisine</li>
                  <li>Locally Sourced Ingredients</li>
                  <li>Traditional Cooking Techniques</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-semibold mb-6 text-left">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-left">
              We aim to be Sri Lanka’s premier dining destination, recognized for delivering exceptional culinary experiences. Our vision is to create a space where every meal reflects the warmth, hospitality, and vibrant culture of Sri Lanka.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-semibold mb-6 text-left">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-left">
              At ABC Restaurant, we are dedicated to offering an unparalleled dining experience. Our mission is to fuse the authentic tastes of Sri Lankan cuisine with modern techniques, providing exceptional service and quality to ensure each visit is unforgettable.
            </p>
          </section>


        </div>
      </div>
    </>
  );
}

export default About;
