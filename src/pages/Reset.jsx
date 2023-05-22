import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button/Button'
import Title from '../components/Title/Title'
import ApiContext from '../context/api.js'
import '../styles/Common.css'
import errorMessageHandler from '../utils/errorMessageHandler'

const Reset = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useContext(ApiContext)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  
  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!password || !confirmPassword) {
      return
    }

    try {
      await api.auth.register({ id, password })
      navigate(`/login`)
    } catch (error) {
      setError(errorMessageHandler(error))
    }
  }

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Password Verification Form' />
          <input
            id='password'
            type='password'            
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            id='confirm-password'
            type='password'            
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button onClick={handleSubmit}>Finish</Button>
          {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Reset
