import React from 'react'
import Button from '../components/Button/Button'
import Title from '../components/Title/Title'
import { useNavigate } from 'react-router-dom'
import '../styles/Common.css'
import '../styles/Today.css'

const Today = () => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString()
  const items = [ 'Category 1' ]

  const handleItemClick = category => {
    console.log(`You clicked on ${category}`)
  }

  const handleBackClick = () => {
    navigate('/menu');
  }
  
  const handleAddItemClick = () => {
    navigate('/edit-item')
  }

  return (
    <div className='today-form'>
      <div className='today-form-content'>
        <Title text={today} />
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            marginBottom: '16px'
          }}
        >
          {items.map((category, index) => (
            <button
              key={category}
              className='today-item'
              onClick={() => handleItemClick(category)}
            >
              { `Item ${index + 1}` }
            </button>
          ))}
        </div>
        <div className='back-two-buttons-container'>
          <Button narrow onClick={handleBackClick}>Back</Button>
          <Button narrow onClick={handleAddItemClick}>Add Item</Button>
        </div>
      </div>
    </div>
  )
}

export default Today
