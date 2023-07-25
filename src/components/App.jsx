import React, { Component } from 'react';
import { Puff } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { fetchImages } from './backendApi'; 

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    loading: false,
    error: null,
    selectedImage: null,
    currentPage: 1,
  };

  handleSearchSubmit = (query) => {
    this.setState({
      searchQuery: query,
      images: [],
      error: null,
      loading: true,
      currentPage: 1,
    });

    this.fetchImagesFromBackend(query, 1);
  };

  fetchImagesFromBackend = async (query, page) => {
    try {
      const fetchedImages = await fetchImages(query, page);
      if (page === 1) {
        this.setState({ images: fetchedImages });
      } else {
        this.setState((prevState) => ({
          images: [...prevState.images, ...fetchedImages],
        }));
      }
    } catch (error) {
      this.setState({ error: 'Помилка при отриманні зображень' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleImageClick = (image) => {
    this.setState({ selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  handleLoadMore = () => {
    const nextPage = this.state.currentPage + 1;
    this.setState({ currentPage: nextPage });
    this.fetchImagesFromBackend(this.state.searchQuery, nextPage);
  };

  render() {
    const { images, loading, error, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {loading && <Puff type="Puff" color="#00BFFF" height={100} width={100} />}
        {error && <div>{error}</div>}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {selectedImage && (
          <Modal onClose={this.handleCloseModal} image={selectedImage} />
        )}
        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore}>Завантажити більше</Button>
        )}
      </div>
    );
  }
}

