import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../components/Loader/Loader'
import GlobalContext from '../context/global.js'

import '../styles/Common.css'
import css from '../styles/ItemId.css'
import editIcon from '../images/edit.png'
import Button from '../components/Button/Button'

const ItemId = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const api = React.useContext(GlobalContext)

  const [error, setError] = useState('')
  const [deletedMsg, setDeletedMsg] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [title, setTitle] = useState('')
  const [values, setValues] = useState([])

  React.useEffect(() => {
    async function fetchData () {
      try {
        const valuesCount = await api.item.getValuesCount({ id })
        const item = await api.item.get({ id })
        const todayValueList = await api.value.getToday({ id })
        if (valuesCount === 0) setShowDeleteButton(true)
        setTitle(item.title)
        setValues(todayValueList.values)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteClick = async () => {
    try {
      if (deletedMsg.length === 0) {
        await api.item.delete({ id })
        setDeletedMsg('The Item has been deleted successfully')
      }
    } catch(error) {
      setError(error)
    }
  }

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={css.formHeader}>
              <label>{title ?? 'Unknown'}</label>
              <img
                src={editIcon}
                alt='Edit'
                className='edit-image'
                onClick={() => navigate(`/edit-item/${id}`)}
              />
              <div className='scroll scroll-gap'>
                {values.length ? (
                  values.map((valueList, index) => (
                    <button
                      key={index}
                      className='element element-value'
                      onClick={() => navigate(`/values/${valueList.id}/${title}`)}
                    >
                      {valueList.value}
                    </button>
                  ))
                ) : (
                  <strong className='element element-value'>No values</strong>
                )}
              </div>
            </div>
            {error && <div className='error'>{error}</div>}
            {deletedMsg.length !== 0 && <div className='success'>{deletedMsg}</div>}
            <div className='back-two-buttons-container'>
              <Button narrow onClick={() => navigate('/today')}>
                Back
              </Button>              
              {showDeleteButton ? <Button narrow onClick={handleDeleteClick}>Delete</Button> : null}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ItemId
