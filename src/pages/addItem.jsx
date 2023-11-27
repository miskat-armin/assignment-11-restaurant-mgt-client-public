import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

const AddItem = () => {
  const { user } = useAuth(); // Assuming useAuth() returns the Firebase user object

  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    foodCategory: '',
    quantity: 0,
    price: 0,
    addBy: {
      name: user.displayName || '',
      email: user.email || '',
    },
    foodOrigin: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request using Fetch API
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        console.log('Item added successfully');
      } else {
        // Handle error
        console.error('Error adding item');
      }
    } catch (error) {
      // Handle fetch error
      console.error('Fetch error', error);
    }
  };

  return (
    <div className="max-w-screen-md mt-4 mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-6">Add Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Food Image</label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Food Category</label>
          <input
            type="text"
            name="foodCategory"
            value={formData.foodCategory}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Food Origin</label>
          <input
            type="text"
            name="foodOrigin"
            value={formData.foodOrigin}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
