import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button/Button'
import Title from '../components/Title/Title'

import '../styles/Common.css'
import '../styles/Today.css'

import getApi from '../api'

const Today = () => {
  const [ items, setItems ] = useState([]);

  const navigate = useNavigate();
  const today = new Date().toLocaleDateString()
  
  const handleItemClick = category => {
    console.log(`You clicked on ${category}`)
  }

  async function fetchItems() {
    // Turn on the loader
    try {
      const api = await getApi();
      const result = await api.item.findByUser();
      return result.items.map(data => data.title);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      // Turn off the loader
    }
  }

  useEffect(() => {
    async function fetchData() {
      const titles = await fetchItems()
      setItems(titles)
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBackClick = () => {
    navigate('/menu');
  }
  
  const handleAddItemClick = () => {
    navigate('/edit-item/')
  }

  return (
    <div className='today-form'>
      <div className='today-form-content'>
        <Title text={today} />
          {items.map((item, index) => (
            <button
              key={item}
              className='today-item'
              onClick={() => handleItemClick(item)}
            >
              { item }
            </button>
          ))}
        <div className='back-two-buttons-container'>
          <Button narrow onClick={handleBackClick}>Back</Button>
          <Button narrow onClick={handleAddItemClick}>Add Item</Button>
        </div>
      </div>
    </div>
  )
}

export default Today;
