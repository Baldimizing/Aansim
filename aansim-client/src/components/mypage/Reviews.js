import React from 'react';
import './Reviews';

function Reviews({ reviews }) {
  return (
    <div className="review-container">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <h3>{review.author}</h3>
          <p>{review.content}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
