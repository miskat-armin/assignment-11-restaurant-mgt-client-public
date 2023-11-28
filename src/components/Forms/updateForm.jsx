import React, { useState } from "react";

const UpdateFoodForm = ({ foodDetails, onUpdate, onCancel }) => {
  const [updatedFoodDetails, setUpdatedFoodDetails] = useState({
    foodName: foodDetails?.foodName,
    foodCategory: foodDetails?.foodCategory,
    quantity: foodDetails?.quantity,
    price: foodDetails?.price,
    foodOrigin: foodDetails?.foodOrigin,
    description: foodDetails?.description,
    foodImage: foodDetails?.foodImage,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFoodDetails({ ...updatedFoodDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedFoodDetails);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="foodName" className="text-sm font-semibold text-gray-600">
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={updatedFoodDetails.foodName}
            onChange={handleInputChange}
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="foodCategory" className="text-sm font-semibold text-gray-600">
            Food Category
          </label>
          <input
            type="text"
            id="foodCategory"
            name="foodCategory"
            value={updatedFoodDetails.foodCategory}
            onChange={handleInputChange}
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="text-sm font-semibold text-gray-600">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={updatedFoodDetails.quantity}
            onChange={handleInputChange}
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="text-sm font-semibold text-gray-600">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={updatedFoodDetails.foodImage}
            onChange={handleInputChange}
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="text-sm font-semibold text-gray-600">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={updatedFoodDetails.price}
            onChange={handleInputChange}
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="foodOrigin" className="text-sm font-semibold text-gray-600">
            Food Origin
          </label>
          <input
            type="text"
            id="foodOrigin"
            name="foodOrigin"
            value={updatedFoodDetails.foodOrigin}
            onChange={handleInputChange}
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-sm font-semibold text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={updatedFoodDetails.description}
            onChange={handleInputChange}
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Update Food
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:border-blue-500 focus:outline-none focus:shadow-outline-blue"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFoodForm;
