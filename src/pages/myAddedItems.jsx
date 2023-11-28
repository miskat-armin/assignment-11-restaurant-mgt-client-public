// FoodListByUser.js
import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useAuth } from "../context/authContext";
import UpdateFoodForm from "../components/Forms/updateForm";
import { toast } from "react-toastify";

const FoodListByUser = ({ userEmail }) => {
  const [userAddedItems, setUserAddedItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    // Fetch user-added items
    fetch(
      import.meta.env.VITE_EXPRESS_API + `/foods/added-by-user/${user?.email}`
    )
      .then((response) => response.json())
      .then((data) => setUserAddedItems(data))
      .catch((error) => toast.error("Error fetching user-added items:", error));
  }, [user?.email]);

  useEffect(() => {
    // Fetch food details when selectedFood changes
    if (selectedFood) {
      fetch(
        import.meta.env.VITE_EXPRESS_API +
          `/foods/get-food-details/${selectedFood._id}`
      )
        .then((response) => response.json())
        .then((data) => setFoodDetails(data))
        .catch((error) => console.error("Error fetching food details:", error));
    }
  }, [selectedFood]);

  const openModal = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFood(null);
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedData) => {
    fetch(
      import.meta.env.VITE_EXPRESS_API +
        `/foods/updateFood/${selectedFood._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          toast.error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        toast.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-wrap justify-around">
      {userAddedItems.map((food) => (
        <div
          key={food._id}
          className="max-w-sm rounded overflow-hidden shadow-lg m-4"
        >
          <img
            className="w-full h-48 object-cover"
            src={food.foodImage}
            alt={food.foodName}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{food.foodName}</div>
            <p className="text-gray-700 text-base mb-2">
              Category: {food.foodCategory}
            </p>
            <p className="text-gray-700 text-base mb-2">Price: ${food.price}</p>
            <button
              onClick={() => openModal(food)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </div>
      ))}

      {/* Daisy UI Modal for updating food item */}
      <Modal open={isModalOpen} onClose={closeModal} center>
        {selectedFood && (
          <div>
            <h2>{selectedFood.foodName}</h2>
            {/* Add your update form or content here */}
            {foodDetails ? (
              // Render your update form or content here
              <UpdateFoodForm
                foodDetails={foodDetails}
                onUpdate={handleUpdate}
                onCancel={closeModal}
              />
            ) : (
              // Display a loading message or other indication
              <p>Loading food details...</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FoodListByUser;
