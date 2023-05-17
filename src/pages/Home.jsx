import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button/Button'
import Title from '../components/Title/Title'

import '../styles/Home.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='home-form'>
      <Title text='My Navigator' />
      <div className='home-button-container'>
        <Button
          onClick={() => {
            navigate('/register')
          }}
        >
          GET STARTED
        </Button>
        <Button
          onClick={() => {
            navigate('/login')
          }}
        >
          SIGN IN
        </Button>
      </div>
    </div>
  )
}

export default Home
