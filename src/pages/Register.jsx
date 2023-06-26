import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import Title from '../components/Title/Title.jsx'
import TwoButtons from '../components/TwoButtons/TwoButtons.jsx'
import isValidEmail from '../utils/validateEmail.js'
import errorMessageHandler from '../utils/errorMessageHandler.js'
import { fetchApiMethods } from '../api/getMethods.js'
import '../styles/Common.css'
import '../styles/Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [error, setError] = useState('')
  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handleDoneClick = async () => {
    setError('')
    if (!email) {
      setError('Empty required field')
      return
    }
    if (isValidEmail(email)) {
      try {
        const api = await fetchApiMethods()
        let { user } = await api.user.find({ email })
        if (user && user.password !== null) {
          setError('This email is already in use')
        } else {
          if (!user) user = await api.user.create({ email })
          const url = `${process.env.REACT_APP_HOST}/reset/${user.id}`
          await api.user.sendEmail({ email, url })
          setIsDone(true)
        }
      } catch (error) {
        console.log(error)
        setError(errorMessageHandler(error))
      }
    } else {
      setError('Invalid Email Address')
      return
    }
  }

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Create Your Profile' />
        {isDone ? (
          <>
            <p className='registration-form-success'>
              Please check your inbox for complete registration
            </p>
            <div className='register-form-content'>
              <Button onClick={() => navigate('/menu')}>Home</Button>
            </div>
          </>
        ) : (
          <>
            <input
              type='text'
              placeholder='email address'
              value={email}
              onChange={handleEmailChange}
            />
            <TwoButtons
              leftTitle='Back'
              handleLeftClick={() => navigate('menu')}
              rightTitle='Done'
              handleRightClick={handleDoneClick}
            />
            {error && <p className='error'>{error}</p>}
          </>
        )}
      </div>
    </div>
  )
}

export default Register
