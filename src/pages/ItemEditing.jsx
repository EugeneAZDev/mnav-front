import React from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Title from '../components/Title/Title'

import '../styles/Common.css';

const ItemEditing = () => {
  const navigate = useNavigate();

  const handleEditSectionsClick = category => {
    navigate('/sections');
  }

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Item Editing Form' />
          <input
            id='name'
            type='text'            
            placeholder='Name of the Item'
          />
          <input
            id='target'
            type='text'            
            placeholder='Target value'
          />
          <Button onClick={handleEditSectionsClick}>Edit</Button>
      </div>
    </div>
  );
};

export default ItemEditing;
