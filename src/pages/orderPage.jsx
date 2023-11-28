import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { state } = useLocation();
  const [foodDetails, setFoodDetails] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    // Fetch food details based on the foodId
    fetch(import.meta.env.VITE_EXPRESS_API + `/foods/get-food-details/${state}`)
      .then((response) => response.json())
      .then((data) => setFoodDetails(data))
      .catch((error) => console.error("Error fetching food details:", error));
  }, [state]);

  const [quantity, setQuantity] = useState(1);

  const totalPrice = foodDetails?.price * quantity;

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleSubmit = async () => {
    if (foodDetails?.quantity <= 0) {
      toast.error("Item is not available");
      return;
    }
    if (quantity > foodDetails?.quantity) {
      toast.error("Quantity can not be greater then " + foodDetails?.quantity);
      return;
    }

    if (user.email === foodDetails?.addBy.email) {
      toast.error("Cannot buy your own product!!");
      return;
    }

    try {
      // Send purchase request to Express API
      const response = await fetch(
        import.meta.env.VITE_EXPRESS_API + "/purchases",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodItemId: state,
            quantity: quantity,
            userEmail: user?.email,
            purchaseDate: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        // Handle success
        toast.success("Purchase successful");
      } else {
        // Handle error
        toast.error("Error making purchase");
      }
    } catch (error) {
      // Handle network or other errors
      toast.error("Error:", error);
    }
  };

  return (
    <div className="max-w-screen-md mt-8 mx-auto text-lg">
      <div className="bg-white rounded-md shadow-md overflow-hidden p-6">
        <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>

        <div className="mb-4">
          <p className="text-gray-600">
            Food Name:{" "}
            <span className="font-semibold">{foodDetails?.foodName}</span>
          </p>
          <p className="text-gray-600">
            Price per unit:{" "}
            <span className="font-semibold">${foodDetails?.price}</span>
          </p>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center max-w-[200px]">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 border border-gray-300 rounded-l-md cursor-pointer"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value, 10)))
              }
              className="flex-1 p-2 border-t border-b border-gray-300 text-center"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 border border-gray-300 rounded-r-md cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p>
            Available:{" "}
            {foodDetails?.quantity - quantity >= 0
              ? foodDetails?.quantity - quantity
              : 0}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Total Price:{" "}
            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Name: <span className="font-semibold">{user?.displayName}</span>
          </p>
          <p className="text-gray-600">
            Email: <span className="font-semibold">{user?.email}</span>
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Purchase Date:{" "}
            <span className="font-semibold">
              {new Date().toLocaleDateString()}
            </span>
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Finalize Purchase
        </button>
      </div>
    </div>
  );
};
export default OrderPage;
