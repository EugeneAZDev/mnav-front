import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import ApiContext from '../context/api.js'
import '../styles/Common.css'
import css from '../styles/Item.css'
import editIcon from '../images/edit.png'
import errorMessageHandler from '../utils/errorMessageHandler'

const Item = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const api = React.useContext(ApiContext)

  const [error, setError] = useState('')
  const [deletedMsg, setDeletedMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [title, setTitle] = useState('')
  const [values, setValues] = useState([])

  React.useEffect(() => {
    async function fetchData () {
      try {
        const { count } = await api.item.getValuesCount({ id })
        const { item } = await api.item.get({ id })
        const { values } = await api.value.getToday({ id })
        if (count === 0) {
          setShowDeleteButton(true)
          setTitle(item.title)
          setValues(values)
        }

        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(errorMessageHandler(error))
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteClick = async () => {
    try {
      setLoading(true)
      if (!deletedMsg) {
        await api.item.delete({ id })
        setDeletedMsg('The Item has been deleted successfully')
        setShowDeleteButton(false)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(errorMessageHandler(error))
    }
  }

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        {loading ? (
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
                {values ? (
                  values.map((valueList, index) => (
                    <button
                      key={index}
                      className='element element-value'
                      onClick={() =>
                        navigate(`/values/value/${valueList.id}/${id}/${title}`)
                      }
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
            {deletedMsg.length !== 0 && (
              <div className='success'>{deletedMsg}</div>
            )}
            <div className='bottom-two-buttons-container'>
              <Button narrow onClick={() => navigate('/today')}>
                Back
              </Button>
              {showDeleteButton ? (
                <Button narrow onClick={handleDeleteClick}>
                  Delete
                </Button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Item
