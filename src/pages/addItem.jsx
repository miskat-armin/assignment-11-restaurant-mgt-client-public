import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const AddItem = () => {
  const { user } = useAuth(); // Assuming useAuth() returns the Firebase user object

  const [formData, setFormData] = useState({
    foodName: "",
    foodImageFile: null,
    foodImagePreview: null,
    foodCategory: "",
    quantity: 0,
    price: 0,
    addBy: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
    foodOrigin: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          foodImageFile: file,
          foodImagePreview: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to ImgBB
      const imgbbResponse = await uploadToImgBB(formData.foodImageFile);
      if (!imgbbResponse.success) {
        throw new Error("Image upload to ImgBB failed");
      }
      // Extract image URL
      const imageUrl = imgbbResponse?.data.url;

      // Update form data with the image URL
      setFormData({
        ...formData,
        foodImageFile: null,
        foodImagePreview: null,
        foodImage: imageUrl,
      });

      // Send POST request to your MongoDB database
      const response = await fetch(
        import.meta.env.VITE_EXPRESS_API + "/foods/add-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            foodImageFile: null,
            foodImagePreview: null,
            foodImage: imageUrl,
          }),
        }
      );

      if (response.ok) {
        // Handle success
        toast.success("Item added successfully");
      } else {
        // Handle error
       toast.error("Error adding item");
      }
    } catch (error) {
      // Handle error
      toast.error("Error:", error);
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return await fetch(
      "https://api.imgbb.com/1/upload?key=afc8c694e18a5ea37d748c1c5bc84eac",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
  };
  return (
    <div className="max-w-screen-md mt-4 mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-6">Add Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Food Image
          </label>
          <input
            type="file"
            name="foodImage"
            onChange={handleImageChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {formData.foodImagePreview && (
            <img
              src={formData.foodImagePreview}
              alt="Food Preview"
              className="mt-2 w-full h-32 object-cover rounded-md"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Food Category
          </label>
          <input
            type="text"
            name="foodCategory"
            value={formData.foodCategory}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Food Origin
          </label>
          <input
            type="text"
            name="foodOrigin"
            value={formData.foodOrigin}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
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
