import React from "react";

const reviews = [
  {
    id: 1,
    name: "Alice Thompson",
    image: "./1.jpg",
    review:
      "I recently used Food Guide to organize a special event at my restaurant, and I couldn't be happier with the results. The team behind it is incredibly professional and made the entire process seamless.",
  },
  {
    id: 2,
    name: "John Davis",
    image: "./2.jpg",
    review:
      "I've been using Food Guide to manage my restaurant's operations, and it has significantly improved efficiency. From reservations to staff scheduling, it's a game-changer for any restaurant owner.",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    image: "./3.jpg",
    review:
      "As a chef, I rely on Food Guide to streamline kitchen processes. The inventory tracking and menu management features are outstanding, making my job much easier.",
  },
  {
    id: 4,
    name: "Michael Lee",
    image: "./4.png",
    review:
      "I had the pleasure of implementing Food Guide in my restaurant, and it's been a tremendous asset. The analytics and reporting tools provide valuable insights, helping us make informed business decisions.",
  },
];
const CustomerReviews = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mx-4">
      {reviews.map((review, idx) => (
        <div
          key={idx}
          className="card bg-base-100 shadow-lg hover:shadow-xl rounded-lg p-4"
        >
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={review.image} />
            </div>
          </div>
          <h3 className="text-xl font-semibold">{review.name}</h3>
          <p className="text-gray-600">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;
