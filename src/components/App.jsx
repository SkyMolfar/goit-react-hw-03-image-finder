import React, { Component } from 'react';
import styled from 'styled-components'; 

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import  { APIservices } from './backendApi'; 
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';


const AppContainer = styled.div`
   display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    isError: false,
    error: null,
    isShowModal: false,
    showImage: null,
    isShowLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.getImage();
    }
  }

  async getImage() {
    const { query, page } = this.state;
    try {
      const { totalHits, hits } = await APIservices.fetchImage(query, page);
      if (totalHits === 0) {
        return toast.error(`There are no images with query "${this.state.query}"`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isShowLoadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message, isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  setQuery = value => {
    this.setState({
      query: value,
      page: 1,
      isError: false,
      isLoading: true,
      images: [],
      isShowLoadMore: false,
    });
  };

  onHandleImage = image => {
    this.setState(state => ({
      isShowModal: !state.isShowModal,
      showImage: image,
    }));
  };

  onCloseModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { isLoading, images, isShowLoadMore, isShowModal, showImage } = this.state;
    const hasImages = images.length > 0;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.setQuery} />
        {isLoading && <Loader />}
        {hasImages && <ImageGallery images={images} onHandleImage={this.onHandleImage} />}
        <ToastContainer
          icon={false}
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          theme="colored"
        />
        {isShowLoadMore && <Button onLoadMore={this.onLoadMore} />}
        {isShowModal && <Modal image={showImage} onCloseModal={this.onCloseModal} />}
      </AppContainer>
    );
  }
}

 
