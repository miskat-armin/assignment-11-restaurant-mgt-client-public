// OrderedItemsByUser.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

const OrderedItemsByUser = () => {
  const { user } = useAuth();
  const [orderedItems, setOrderedItems] = useState([]);

  console.log(
    import.meta.env.VITE_EXPRESS_API +
      `/purchases/ordered-items-by-user/${user?.email}`
  );

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
                <td className="py-2 px-4 border-b text-left">{item.foodOwner}</td>
                <td className="py-2 px-4 border-b text-left">
                  {new Date(item.purchaseDate).toLocaleDateString()}
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
