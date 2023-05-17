import React, { useContext, useState } from 'react'

import { AuthContext } from '../context/auth'
import GlobalContext from '../context/global.js'
import isValidEmail from '../utils/validateEmail.js'

import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'

import '../styles/Common.css'

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')

  const api = useContext(GlobalContext)

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email || !password) {
      setError('Email and Password are required fields')
      return
    }
    if (!isValidEmail(email)) {
      setError('Invalid Email Address')
      return
    }

    try {
      const result = await api.auth.login({ email, password })
      localStorage.setItem('token', result.token)
      setIsLoading(false)
      setIsAuth(true)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
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
