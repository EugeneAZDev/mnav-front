import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'
import TwoButtons from '../components/TwoButtons/TwoButtons'
import { fetchApiMethods } from '../api/getMethods'
import '../styles/Common.css'
import errorMessageHandler from '../utils/errorMessageHandler.js'

const Today = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const today = new Date().toLocaleDateString()

  async function fetchItems () {
    try {
      const api = await fetchApiMethods()
      const { items } = await api.item.findByUser()
      const { values } = await api.value.getToday()

      items.map(item => {
        if (item.valueType === 'text') {
          item.value = -1
          return item
        }
        const totalValue = values
          .filter(v => v.itemId === item.id)
          .map(v => parseInt(v.value))
          .reduce((total, value) => total + value, 0)
        item.value = totalValue
        return item
      })
      setLoading(false)
      return items
    } catch (error) {
      setLoading(false)
      setError(errorMessageHandler(error))
      return []
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

  if (loading) {
    return <Loader />
  }

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        <Title text={today} />
        {loading ? (
          <Loader />
        ) : (
          <div className='scroll'>
            {items.length ? (
              items.map(item => (
                <Button
                  activeLongPress={true}
                  key={item.title}
                  className='element'
                  onLongPress={() => navigate(`/items/${item.id}`)}
                  onPress={() =>
                    navigate(
                      `/values/${item.id}/${item.title}/${item.valueType}`
                    )
                  }
                >
                  <div>
                    <span>{item.title}</span>
                    {item.value > 0 ? (
                      <>
                        <span
                          style={{
                            paddingLeft: '15px',
                            fontWeight: 'bold'
                          }}
                        >
                          {item.value}
                        </span>
                      </>
                    ) : item.value === -1 ? (
                      <></>
                    ) : (
                      <span style={{ paddingLeft: '4px' }}>0</span>
                    )}
                    {item.target && item.target !== 0 ? (
                      <>
                        <span
                          style={{
                            paddingLeft: '4px'
                          }}
                        >
                          of {item.target}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </Button>
              ))
            ) : (
              <strong className='gray-element element-value'>No items</strong>
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
