import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer, ModalImage } from './Modal.styled';

export const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, [onCloseModal]);

  const { largeImageURL, tags } = image;

  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer>
        <ModalImage src={largeImageURL} alt={tags} />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

 
