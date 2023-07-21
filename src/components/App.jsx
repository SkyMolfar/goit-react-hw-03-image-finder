import React, { useState } from 'react';
import axios from 'axios';
import { Puff } from 'react-loader-spinner';


import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export const App = () =>{
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setImages([]);
    setError(null);
    setLoading(true);
    setCurrentPage(1);

    fetchImages(query, 1);
  };

  const fetchImages = (query, page) => {
    axios
      .get('https://pixabay.com/api/', {
        params: {
          key: '38391360-90abe6777395014beef704742', 
          q: query,
          image_type: 'photo',
          per_page: 10,
          page,
        },
      })
      .then((response) => {
        if (page === 1) {
          setImages(response.data.hits);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.hits]);
        }
      })
      .catch((error) => {
        setError('Помилка при отриманні зображень');
      })
      .finally(() => {
        setLoading(false);
      });
  };

 
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchImages(searchQuery, nextPage);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      {loading && <Puff type="Puff" color="#00BFFF" height={100} width={100} />}
      {error && <div>{error}</div>}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {selectedImage && (
       <Modal onClose={handleCloseModal} image={selectedImage} />
      )}
      {images.length > 0 && !loading && (
        <Button onClick={handleLoadMore}>Завантажити більше</Button>
      )}
    </div>
  );
};

 
