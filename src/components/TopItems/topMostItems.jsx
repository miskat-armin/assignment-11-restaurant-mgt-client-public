// TopOrderedItems.js
import React, { useState, useEffect } from 'react';

const TopOrderedItems = () => {
  const [topOrderedItems, setTopOrderedItems] = useState([]);

  useEffect(() => {
    // Fetch top 6 most ordered items
    fetch(import.meta.env.VITE_EXPRESS_API + '/purchases/top-most-items')
      .then((response) => response.json())
      .then((data) => setTopOrderedItems(data))
      .catch((error) => console.error('Error fetching top ordered items:', error));
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {topOrderedItems.map((item) => (
        <div key={item._id} className="bg-white shadow-md rounded-md overflow-hidden">
          {item.foodImage && (
            <img
              src={item.foodImage}
              alt={item.foodName}
              className="w-full h-48 object-cover rounded-t-md"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.foodName}</h2>
            <p className="text-gray-600 mb-2">Category: {item.foodCategory}</p>
            <p className="text-gray-600 mb-2">Price: ${item.price}</p>
            <button className="btn btn-primary">Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopOrderedItems;
