import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import GlobalContext from '../context/global.js'

import arrowUp from '../images/arrow-up.png'
import arrowDown from '../images/arrow-down.png'

import '../styles/Common.css'
import css from '../styles/ItemId.css'

const Value = () => {
  const navigate = useNavigate()
  const { itemId, itemTitle } = useParams()
  const api = React.useContext(GlobalContext)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [value, setValue] = React.useState(10)

  React.useEffect(() => {
    async function fetchData () {
      try {
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddClick = async () => {
    try {
      setLoading(true)
      await api.value.create({ value, itemId })
      setLoading(false)
      navigate('/today')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        <div className={css.formHeader}>
          <label>{itemTitle}</label>
          <div className='edit-value'>
            <div>
              <img
                src={arrowUp}
                alt='Up'
                className='edit-image'
                onClick={() => {
                  setValue(value + 1)
                }}
              />
            </div>
            <div>
              <h1>{value}</h1>
            </div>
            <div>
              <img
                src={arrowDown}
                alt='Down'
                className='edit-image'
                onClick={() =>
                  value - 1 <= 0 ? setValue(1) : setValue(value - 1)
                }
              />
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className='back-two-buttons-container'>
            <Button narrow onClick={() => navigate('/today')}>
              Back
            </Button>
            <Button narrow onClick={handleAddClick}>
              Add
            </Button>
          </div>
        )}
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Value
