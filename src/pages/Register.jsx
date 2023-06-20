import React, { useContext, useState } from 'react'
import Button from '../components/Button/Button.jsx'
import Title from '../components/Title/Title.jsx'
import ApiContext from '../context/api.js'
import '../styles/Common.css'
import '../styles/Register.css'
import isValidEmail from '../utils/validateEmail.js'
import errorMessageHandler from '../utils/errorMessageHandler.js'

const Register = () => {
  const [email, setEmail] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [error, setError] = useState('')

  const api = useContext(ApiContext)

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
        const { user } = await api.user.find({ email })
        if (user) {
          setError('This email is already in use')
        } else {
          const user = await api.user.create({ email })
          const url = `${process.env.REACT_APP_HOST}/reset/${user.userId}`
          console.log(url)
          // TODO Implement functions below:
          // 3. Send email
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
          <p className='registration-form-success'>
            Please check your inbox for complete registration
          </p>
        ) : (
          <>
            <input
              type='text'
              placeholder='email address'
              value={email}
              onChange={handleEmailChange}
            />
            <Button onClick={handleDoneClick}>Done</Button>
            {error && (
              <p className='error'>
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Register
