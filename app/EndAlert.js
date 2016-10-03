import React from 'react';
import './styles/EndAlert.scss';

const EndAlert = ({ message }) => {
  return (
    <div className="EndAlert">
      { message }
    </div>
  );
};

export default EndAlert;
