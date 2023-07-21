import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled'

export const Button = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Завантажити більше</StyledButton>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};