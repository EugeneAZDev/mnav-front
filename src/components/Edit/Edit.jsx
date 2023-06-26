import React from 'react';
import editIcon from '../../images/edit.png'
import css from './Edit.module.css'

const Edit = ({ onClick: handleEditClick }) => {
  return (
    <img
        className={css.image}
        src={editIcon}
        alt='Edit'
        onClick={handleEditClick}
      />
  );
};

export default Edit;
