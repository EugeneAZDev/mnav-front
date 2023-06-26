import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button/Button'
import Title from '../components/Title/Title'

import '../styles/Home.css'
import '../styles/Common.css' // Temporary for alpha version text

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='home-form'>
      <Title text='My Activity Navigator' />
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
      <br/>
      <div><label className='error'>Experimental version: 1.0.0</label></div>
      <div><label className='error'>Alpha PRIVATE Testing</label></div>
      <div><label className='error'>We Provide No Guarantee for</label></div>
      <div><label className='error'>YOUR Information Safety</label></div>
    </div>
  )
}

export default Home
