'use client';
import { Rating, Star, RoundedStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useState } from 'react';

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: '#f59e0b',
  inactiveFillColor: '#ffedd5',
};

export function RatingScore({
  value,
  width = 115,
  readOnly = true,
  onChange,
}: any) {
  const [rating, setRating] = useState(value);

  const handleChange = (value: any) => {
    setRating(value);
    onChange(value);
  };

  return (
    <Rating
      style={{ maxWidth: width }}
      value={rating}
      itemStyles={myStyles}
      onChange={handleChange}
      readOnly={readOnly}
    />
  );
}
