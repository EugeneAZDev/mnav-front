import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../components/Loader/Loader'
import GlobalContext from '../context/global.js'

import '../styles/Common.css'
import css from '../styles/ItemId.css'
import editIcon from '../images/edit.png'

const ItemIdEditing = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const api = React.useContext(GlobalContext)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [values, setValues] = React.useState([])

  React.useEffect(() => {
    async function fetchData () {
      try {
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleValueClick = value => {}

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        <div className={css.formHeader}>
          <label>Item</label>
          <img src={editIcon} alt='Edit' />
          {isLoading ? (
            <Loader />
          ) : (
            <div className='scroll scroll-gap'>
              {values.map((value, index) => (
                <button
                  key={index}
                  className='element element-value'
                  onClick={() => handleValueClick(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemIdEditing;