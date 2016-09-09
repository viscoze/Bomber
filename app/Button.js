import React from 'react';
import './styles/Button.scss';

const Button = ({ label, handleClick }) => {
  return (
    <button onClick={handleClick}>
      { label }
    </button>
  );
};

export default Button;
