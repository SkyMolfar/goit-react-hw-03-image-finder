import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'; 

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="gallery">
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};



