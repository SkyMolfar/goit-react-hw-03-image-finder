import React from 'react';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    onSubmit(query);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};


