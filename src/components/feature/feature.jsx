import React from "react";

const Features = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse justify-around hero bg-base-300 p-10">
      <div className="flex flex-col justify-center items-start max-w-xl mb-16 lg:mb-0">
        <h2 className="text-3xl md:text-5xl font-bold">ElectroPerks</h2>
        <h2 className="text-2xl font-semibold mb-4">SmartTable</h2>
        <p className="text-left text-lg mb-4">
          Effortlessly manage your restaurant's dining area with SmartTable.
          This feature allows you to optimize table assignments, track
          reservations, and enhance customer satisfaction by ensuring efficient
          seating arrangements. Say goodbye to manual seating challenges and
          embrace a seamless dining experience for your guests.
        </p>
        <button className="btn hover:scale-105 transform transition duration-300">
          Explore
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img src="./ecommerce.png" />
      </div>
    </div>
  );
};

export default Features;
