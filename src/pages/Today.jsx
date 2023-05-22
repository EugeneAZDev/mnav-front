import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'
import TwoButtons from '../components/TwoButtons/TwoButtons'
import ApiContext from '../context/api.js'
import '../styles/Common.css'
import errorMessageHandler from '../utils/errorMessageHandler.js'

const Today = () => {
  const navigate = useNavigate()
  const api = React.useContext(ApiContext)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const today = new Date().toLocaleDateString()

  async function fetchItems () {
    try {
      const { items } = await api.item.findByUser()
      setLoading(false)
      return items
    } catch (error) {
      setLoading(false)
      setError(errorMessageHandler(error))    
      return [];
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
        {loading ? (
          <Loader />
        ) : (
          <div className='scroll'>
            {items.length ? items.map(item => (
              <Button
                activeLongPress={true}
                key={item.title}
                className='element'
                onLongPress={() => navigate(`/items/${item.id}`)}
                onPress={() => navigate(`/values/${item.id}/${item.title}`)}
              >
                {item.title}
              </Button>
            )) : (
              <strong className='element element-value'>No items</strong>
            )}
          </div>
        )}
        <TwoButtons
          leftTitle='Back'
          handleLeftClick={() => navigate('/menu')}
          rightTitle='Add Item'
          handleRightClick={() => navigate('/edit-item')}
        />
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Today
