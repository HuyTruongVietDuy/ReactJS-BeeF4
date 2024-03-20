// ImagePopup.js
import React from 'react';
import '../CSS Modules/imagepoup.css';

const ImagePopup = ({ id, imageUrl, onClose }) => {
  return (
    <div className="image-popup">
      <div className="popup-content">
        <img src={imageUrl} alt='' />
        <button onClick={() => onClose(id)}>X</button>
      </div>
    </div>
  );
};
export default ImagePopup;
