import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth'
import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'
import ApiContext from '../context/api.js'
import isValidEmail from '../utils/validateEmail.js'
import errorMessageHandler from '../utils/errorMessageHandler.js'
import '../styles/Common.css'

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')

  const api = useContext(ApiContext)

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and Password are required fields')
      return
    }
    if (!isValidEmail(email)) {
      setError('Invalid Email Address')
      return
    }

    try {
      setIsLoading(true)
      const { token } = await api.auth.login({ email, password })
      localStorage.setItem('token', token)
      setIsLoading(false)
      setIsAuth(true)
    } catch (error) {
      setIsLoading(false)
      setError(errorMessageHandler(error))
    }
  }

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Login Page' />
        <input
          id='login'
          type='text'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
        />
        <input
          id='login-password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <Button onClick={handleSubmit}>Sign in</Button>
        )}
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Login
