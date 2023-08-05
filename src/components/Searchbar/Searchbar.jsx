import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Header, Form, Button, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleOnChange = (e) => {
    setQuery(e.currentTarget.value.trim().toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query === '') {
      return toast.error('Please, enter a query and try again');
    }

    onSubmit(query);
    setQuery('');
    e.target.reset();
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleOnChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <Button type="submit" aria-label="Search">
          <SearchIcon />
        </Button>
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


