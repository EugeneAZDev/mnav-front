import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditNumber from '../components/EditNumber/EditNumber'
import Loader from '../components/Loader/Loader'
import ApiContext from '../context/api.js'
import TwoButtons from '../components/TwoButtons/TwoButtons'
import '../styles/Common.css'
import css from '../styles/Item.css'
import validNumberValue from '../utils/validNumberValue.js'
import errorMessageHandler from '../utils/errorMessageHandler.js'

const Value = () => {
  const navigate = useNavigate()
  const { valueId, itemId, itemTitle } = useParams()
  const api = React.useContext(ApiContext)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [value, setValue] = React.useState()

  React.useEffect(() => {
    async function fetchData () {
      try {
        if (valueId) {
          const { value } = await api.value.get({ id: valueId })
          setValue(value)
        } else {
          const { lastValue } = await api.item.getLastValue({ id: itemId })
          if (validNumberValue(lastValue)) setValue(lastValue)
        }
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
      setError(errorMessageHandler(error))
    }
  }

  const handleDeleteClick = async () => {
    try {
      setLoading(true)
      await api.value.delete({ id: valueId })
      setLoading(false)
      navigate(`/items/${itemId}`)
    } catch (error) {
      setLoading(false)
      setError(errorMessageHandler(error))
    }
  }

  const handleSaveClick = async () => {
    try {
      setLoading(true)
      await api.value.update({ id: valueId, value })
      setLoading(false)
      navigate(`/items/${itemId}`)
    } catch (error) {
      setLoading(false)
      setError(errorMessageHandler(error))
    }
  }

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        <div className={css.formHeader}>
          <label>{itemTitle}</label>
          <EditNumber
            value={value}
            handleUp={() => setValue(value + 1)}
            handleDown={() =>
              value - 1 <= 0 ? setValue(1) : setValue(value - 1)
            }
          />
        </div>
        {loading ? (
          <Loader />
        ) : valueId ? (
          <TwoButtons
            leftTitle='Delete'
            handleLeftClick={handleDeleteClick}
            rightTitle='Save'
            handleRightClick={handleSaveClick}
          />
        ) : (
          <TwoButtons
            leftTitle='Back'
            handleLeftClick={() => navigate('/today')}
            rightTitle='Add'
            handleRightClick={handleAddClick}
          />
        )}
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Value
