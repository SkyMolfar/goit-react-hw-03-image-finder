import React from 'react';

export const ImageGalleryItem = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };

  return (
    <li className="gallery-item" onClick={handleClick}>
      <img src={image.webformatURL} alt={image.tags} />
    </li>
  );
};

