import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Title from '../components/Title/Title'
import InputAndDelete from '../components/InputAndDelete/InputAndDelete'

import '../styles/Common.css'

const Sections = () => {
  const navigate = useNavigate();

  const defaultLabel = 'New section';
  const [sections, setSections] = useState(['Activity'])

  const handleAddSection = (index) => {
    const clone = [...sections, defaultLabel]
    setSections(clone)
  }

  const handleBackClick = () => {
    navigate('/edit-item');
  }

  const handleOnClickInput = (event, index) => {
    const clone = [...sections];
    const value = event.target.value;
    const result = value.includes(defaultLabel) ? value.replace(defaultLabel, '') : value;
    clone[index] = result;
    setSections(clone);
  };
  
  const handleSectionChange = (event, index) => {
    const clone = [...sections]
    clone[index] = event.target.value
    setSections(clone)
  }

  const handleDelete = (index) => {
    const clone = [...sections];
    clone.splice(index, 1);
    setSections(clone);
  };

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Sections' />
        {sections.map((section, index) => (
          <InputAndDelete
            key={index}
            defaultLabel={defaultLabel}
            inputIndex={index}
            inputValue={section}
            onChange={event => handleSectionChange(event, index)}
            onClick={event => handleOnClickInput(event, index)}
            onDelete={handleDelete}
          />
        ))}
        <div className='back-two-buttons-container'>
          <Button narrow onClick={handleBackClick}>Back</Button>
          <Button narrow onClick={handleAddSection}>Add Section</Button>
        </div>
      </div>
    </div>
  )
}

export default Sections
