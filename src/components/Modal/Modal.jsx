import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalImage, Overlay } from './Modal.styled';


export const Modal = ({ onClose, image }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay className="overlay" onClick={handleOverlayClick}>
      <ModalContainer className="modal">
        <ModalImage src={image.largeImageURL} alt={image.tags} />
      </ModalContainer>
    </Overlay>
  );
};
 
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};