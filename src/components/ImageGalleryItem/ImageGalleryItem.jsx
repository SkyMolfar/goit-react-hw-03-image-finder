import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onHandleImage }) => {
  return (
    <GalleryItem>
      <Image
        src={image.webformatURL}
        alt={image.alt}
        onClick={() => onHandleImage(image)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onHandleImage: PropTypes.func.isRequired,
};

 
