import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import TwoButtons from '../components/TwoButtons/TwoButtons'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'
import isValidEmail from '../utils/validateEmail.js'
import errorMessageHandler from '../utils/errorMessageHandler.js'
import '../styles/Common.css'
import { fetchApiMethods } from '../api/getMethods'

const Login = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
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
      setLoading(true)
      const api = await fetchApiMethods()
      const { token } = await api.auth.login({ email, password })
      localStorage.setItem('token', token)
      setLoading(false)
      setIsAuth(true)
    } catch (error) {
      setLoading(false)
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
        {loading ? (
          <Loader />
        ) : (
          <TwoButtons
            leftTitle='Back'
            handleLeftClick={() => navigate('/menu')}
            rightTitle='Sign in'
            handleRightClick={handleSubmit}
          />
        )}
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Login
