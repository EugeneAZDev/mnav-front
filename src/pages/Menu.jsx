import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/auth'

import Button from '../components/Button/Button'

import '../styles/Common.css'
import '../styles/Menu.css'

const buttons = [
  { id: 'today',  label: 'TODAY' },
  // { id: 'export', label: 'EXPORT' },
  { id: 'import', label: 'IMPORT' },
  { id: 'logout', label: 'LOG OUT' }
]

const Menu = () => {
  const navigate = useNavigate()
  const { setIsAuth } = useContext(AuthContext)
  
  const handlerFunctions = new Map([
    [
      'today',
      () => {
        navigate('/today');
      }
    ],
    ['export', () => {
      navigate('/export')
    }],
    ['import', () => {
      navigate('/import')
    }],
    [
      'logout',
      () => {
        setIsAuth(false)
        localStorage.removeItem('token')
      }
    ]
  ])

  const handleButtonClick = id => {
    handlerFunctions.get(id)()
  }

  return (
    <div className='menu-container'>
      <div className='menu-label'>MENU</div>
      <div className='menu-buttons'>
        {buttons.map(button => (
          <Button key={button.id} onClick={() => handleButtonClick(button.id)}>
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Menu
