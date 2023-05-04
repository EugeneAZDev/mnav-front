import React, { useContext } from 'react';
import Button from '../components/Button/Button'
import { AuthContext } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title/Title'

import '../styles/Home.css'
import '../styles/Common.css'

const Home = () => {  
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  
  return (
    <div className='home-form'>
      <Title text='My Navigator'/>
      <div className="home-button-container">
        <Button onClick={() => {navigate('/register')}}>GET STARTED</Button>
        <Button onClick={() => {navigate('/login')}}>SIGN IN</Button>
      </div>
    </div>
   )
};

export default Home;
