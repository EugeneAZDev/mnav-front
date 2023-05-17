import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'

import '../styles/Common.css'

import getApi from '../api'

const Today = () => {
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const today = new Date().toLocaleDateString()

  async function fetchItems () {
    try {
      const api = await getApi()
      const result = await api.item.findByUser()
      setIsLoading(false)
      return result
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching items:', error)
    }
  }

  useEffect(() => {
    async function fetchData () {
      const itemList = await fetchItems()
      setItems(itemList)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        <Title text={today} />
        {isLoading ? (
          <Loader />
        ) : (
          <div className='scroll'>
            {items.map(item => (
              <button
                key={item.title}
                className='element'
                onClick={() => navigate(`/items/${item.id}`)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
        <div className='back-two-buttons-container'>
          <Button narrow onClick={() => navigate('/menu')}>
            Back
          </Button>
          <Button narrow onClick={() => navigate('/edit-item')}>
            Add Item
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Today
