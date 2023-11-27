import React from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah Smith",
    image: "./images/client/1.jpg",
    review:
      "I recently used this website to organize a gaming event, and I couldn't be happier with the results. The team behind it is incredibly professional and made the entire process seamless.",
  },
  {
    id: 2,
    name: "Mike Johnson",
    image: "./images/client/2.jpg",
    review:
      "I've attended multiple tech conferences organized by this website, and each one has been a fantastic experience. The speakers, workshops, and overall organization are top-notch.",
  },
  {
    id: 3,
    name: "Emily Rogers",
    image: "./images/client/3.jpg",
    review:
      "As a streamer, I rely on events like these to connect with my audience. This website has consistently delivered engaging gaming events that help me grow my channel. Kudos to the team!",
  },
  {
    id: 4,
    name: "David Chen",
    image: "./images/client/4.jpg",
    review:
      "I had the pleasure of working with this website to host a tech product launch event. Their attention to detail and commitment to success were impressive. I highly recommend them.",
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
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
