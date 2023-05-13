import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button/Button'
import Title from '../components/Title/Title'
import ComboBox from '../components/ComboBox/ComboBox'

import '../styles/Common.css'

import GlobalContext from '../context/global.js'

const ItemEditing = () => {
  const api = useContext(GlobalContext)
  const navigate = useNavigate()
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    async function fetchData () {
      const sectionList = await api.section.findByUser()
      setOptions(sectionList.sections.map(data => data.title))
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOptionChange = event => {
    setSelectedOption(event.target.value)
  }

  const handleEditSectionsClick = item => {
    navigate('/sections')
  }

  const handleCancelClick = () => {
    navigate('/today')
  }

  const handleSaveClick = () => {
    console.log(selectedOption)

    navigate('/today')
  }

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Item Editing Form' />
        <input id='name' type='text' placeholder='Name of the Item' />
        <input id='target' type='text' placeholder='Target value' />
        <ComboBox
          options={options}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
          handleEditSectionsClick={handleEditSectionsClick}
        />
        <div className='back-two-buttons-container'>
          <Button narrow onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button narrow onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ItemEditing
