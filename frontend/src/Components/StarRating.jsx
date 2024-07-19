import React from "react";

const StarRating = ({ rating }) => {
  const totalStar = 5;
  const filledStars = Math.floor(rating);
  const emptyStars = totalStar - filledStars;

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.334 4.102a1 1 0 00.95.69h4.3c.969 0 1.372 1.24.588 1.81l-3.49 2.536a1 1 0 00-.364 1.118l1.334 4.102c.3.921-.755 1.688-1.54 1.118l-3.49-2.536a1 1 0 00-1.176 0l-3.49 2.536c-.784.57-1.84-.197-1.54-1.118l1.334-4.102a1 1 0 00-.364-1.118L2.177 9.53c-.784-.57-.38-1.81.588-1.81h4.3a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.334 4.102a1 1 0 00.95.69h4.3c.969 0 1.372 1.24.588 1.81l-3.49 2.536a1 1 0 00-.364 1.118l1.334 4.102c.3.921-.755 1.688-1.54 1.118l-3.49-2.536a1 1 0 00-1.176 0l-3.49 2.536c-.784.57-1.84-.197-1.54-1.118l1.334-4.102a1 1 0 00-.364-1.118L2.177 9.53c-.784-.57-.38-1.81.588-1.81h4.3a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
