import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    onSubmit(query);
  };

  return (
    <Header className="searchbar">
      <Form className="form" onSubmit={handleSubmit}>
        <Button type="submit" className="button">
          <span className="button-label">Search</span>
        </Button>

        <Input
          className="input"
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};