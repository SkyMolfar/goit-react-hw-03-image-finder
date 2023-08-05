import React from 'react';
import PropTypes from 'prop-types';
import { GalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onHandleImage }) => {
  return (
    <GalleryContainer>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onHandleImage={onHandleImage}
        />
      ))}
    </GalleryContainer>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onHandleImage: PropTypes.func.isRequired,
};

 
