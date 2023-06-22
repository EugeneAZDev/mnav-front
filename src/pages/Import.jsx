import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import errorMessageHandler from '../utils/errorMessageHandler.js'
import FileUploader from '../components/FileUploader/FileUploader'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'
import '../styles/Common.css'
import '../styles/Exchange.css'
import { fetchApiMethods } from '../api/getMethods'

const Import = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = React.createRef('')
  
  const handleUpload = async event => {
    try {
      setError('')
      setSuccess('')
      setLoading(true)
      const api = await fetchApiMethods()
      const file = event.target.files[0]
      fileInputRef.current.value = ''
      const result = await api.exchange.upload({ file })
      setLoading(false)
      setSuccess(result.message)
    } catch (error) {
      setLoading(false)
      setError(errorMessageHandler(error))
    }
  }

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        <Title text='Import' />
        {loading ? (
          <Loader />
        ) : (
          <div className='button-container'>
            <FileUploader ref={fileInputRef} handleChange={handleUpload} />
            <Button onClick={() => navigate('/menu')}>Back</Button>
          </div>
        )}
        {error && <div className='error'>{error}</div>}
        {success && <div className='success'>{success}</div>}
      </div>
    </div>
  )
}

export default Import
