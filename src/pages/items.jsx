import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Items = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all food items
    fetch(import.meta.env.VITE_EXPRESS_API + `/foods/get-all-foods/${currentPage}`)
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, [currentPage]);

  const handleSearch = () => {
    // Filter the food items based on the search term
    const filteredFoods = foods.filter((food) =>
      food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoods(filteredFoods);
  };



  return (
    <div className="max-w-screen-lg mt-4 mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Food List</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by food name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleSearch}
          className="mt-2 ml-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {foods.map((food) => (
          <div
            key={food._id}
            className=" card bg-white max-w-sm rounded-md shadow-md overflow-hidden"
          >
            {food.foodImage && (
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{food.foodName}</h3>
              <p className="text-gray-600">Category: {food.foodCategory}</p>
              <p className="text-gray-600">Price: ${food.price}</p>
              <p className="text-gray-600">Quantity: {food.quantity}</p>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200">
              <a
                href="#"
                className="text-indigo-500 hover:underline"
                // Add an onClick event handler for the details button
                onClick={(e) => {
                  e.preventDefault();
                  // Add logic to handle details button click (e.g., navigate to details page)
                  navigate(`/${food._id}`)
                }}
              >
                View details
              </a>
              {/* Add any other actions or buttons here */}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="px-4 py-2 mr-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Items;
