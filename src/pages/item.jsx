// Item.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Item = () => {
  const { item } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch food details based on the foodId
    fetch(import.meta.env.VITE_EXPRESS_API + `/foods/get-food-details/${item}`)
      .then((response) => response.json())
      .then((data) => setFoodDetails(data))
      .catch((error) => console.error("Error fetching food details:", error));
  }, [item]);

  if (!foodDetails) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-screen-md mt-8 mx-auto">
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        {foodDetails.foodImage && (
          <img
            src={foodDetails.foodImage}
            alt={foodDetails.foodName}
            className="w-full h-auto object-cover rounded-t-md"
          />
        )}
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-2">
            {foodDetails.foodName}
          </h2>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Category:</span>{" "}
            {foodDetails.foodCategory}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Price:</span> ${foodDetails.price}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Made By:</span>{" "}
            {foodDetails.addBy?.name || foodDetails.addBy?.email}
          </p>

          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Food Origin:</span>{" "}
            {foodDetails.foodOrigin}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Description:</span>{" "}
            {foodDetails.description}
          </p>
          <button
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
            onClick={() => {
              navigate("/order-item", { state: item});
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
