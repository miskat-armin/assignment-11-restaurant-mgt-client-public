// OrderedItemsByUser.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const OrderedItemsByUser = () => {
  const { user } = useAuth();
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        import.meta.env.VITE_EXPRESS_API +
          `/purchases/ordered-items-by-user/${user?.email}`
      )
        .then((response) => response.json())
        .then((data) => setOrderedItems(data))
        .catch((error) =>
          console.error("Error fetching ordered items:", error)
        );
    }
  }, [user?.email]);

  const handleDeleteItem = (itemId) => {
    console.log(itemId)
    // Make API request to delete the item with the given itemId
    fetch(
      import.meta.env.VITE_EXPRESS_API + `/purchases/delete-item/${itemId}`, // Adjust the API endpoint as needed
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // Update the state to reflect the deletion
          setOrderedItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemId)
          );
          toast.success("Deleted successfully")
        } else {
          toast.error("Error deleting item:", response.statusText);
        }
      })
      .catch((error) => toast.error("Error deleting item:", error));
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4">
        Ordered Items for {user?.email}
      </h2>
      {orderedItems.length === 0 ? (
        <p>No ordered items found for this user.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Food Name</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Quantity</th>
              <th className="py-2 px-4 border-b text-left">Owner</th>
              <th className="py-2 px-4 border-b text-left">Purchase Date</th>
              <th className="py-2 px-4 border-b text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-4 border-b text-left">
                  {item.foodName}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {item.foodCategory}
                </td>
                <td className="py-2 px-4 border-b text-left">${item.price}</td>
                <td className="py-2 px-4 border-b text-left">
                  {item.quantity}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {item.foodOwner}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  <button
                    onClick={() => handleDeleteItem(item._id)} // Assuming item.id is unique for each item
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderedItemsByUser;
