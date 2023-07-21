import React, { useEffect } from 'react';

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
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};
 
