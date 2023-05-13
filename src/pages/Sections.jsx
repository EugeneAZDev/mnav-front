import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button/Button.jsx'
import Title from '../components/Title/Title.jsx'
import InputAndDelete from '../components/InputAndDelete/InputAndDelete.jsx'

import '../styles/Common.css'

import GlobalContext from '../context/global.js'

import getKeyByValue from '../utils/getKeyMap.js'

const Sections = () => {
  const api = React.useContext(GlobalContext)
  const navigate = useNavigate()
  const defaultLabel = 'New section'

  const [error, setError] = useState('')
  const [sections, setSections] = useState([])
  const [sectionTitlesToAdd, setSectionTitlesToAdd] = useState([])

  const idTitleMapRef = React.useRef()

  React.useEffect(() => {
    async function fetchData () {
      const sectionList = await api.section.findByUser()
      setSections(sectionList.sections.map(data => data.title))

      const map = new Map()
      sectionList.sections.forEach(x => map.set(x.id, x.title))
      idTitleMapRef.current = map
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddSection = index => {
    const clone = [...sections, defaultLabel]
    setSections(clone)
    setSectionTitlesToAdd(prevTitles => [...prevTitles, defaultLabel])
  }

  const handleBackClick = async () => {
    const cleanSectionTitlesToAdd = [...sectionTitlesToAdd].filter(
      item => item !== defaultLabel
    )
    try {
      await Promise.all(
        cleanSectionTitlesToAdd.map( title => api.section.create({ title }) )
      )
    } catch (e) {
      setError(e)
    }
    navigate('/edit-item')
  }

  const handleOnClickInput = (event, index) => {
    const clone = [...sections]
    const value = event.target.value
    const result = value.includes(defaultLabel)
      ? value.replace(defaultLabel, '')
      : value
    clone[index] = result
    setSections(clone)
    setSectionTitlesToAdd(prevTitles => {
      const newTitles = [...prevTitles]
      const titleIndex = newTitles.indexOf(defaultLabel)
      if (titleIndex !== -1) {
        newTitles[titleIndex] = result
      }

      return newTitles
    })
  }

  const handleSectionChange = (event, index) => {
    const newValue = event.target.value
    const clone = [...sections]
    const currentTitle = clone[index]
    const key = getKeyByValue(currentTitle, idTitleMapRef.current)
    clone[index] = newValue
    setSections(clone)
    if (key) idTitleMapRef.current.set(key, newValue)
    else {
      setSectionTitlesToAdd(prevTitles => {
        const newTitles = [...prevTitles]
        const titleIndex = newTitles.indexOf(currentTitle)
        if (titleIndex !== -1) {
          newTitles[titleIndex] = newValue
        }
        return newTitles
      })
    }
  }

  const handlerInputBlur = async index => {
    const value = sections[index]
    const key = getKeyByValue(value, idTitleMapRef.current)
    try {
      if (key) await api.section.update({ id: key, title: value })
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDelete = async index => {
    setError('')
    const clone = [...sections]
    const currentTitle = clone[index]
    const key = getKeyByValue(currentTitle, idTitleMapRef.current)
    try {
      if (key) {
        await api.section.delete({ id: key })
      }
      clone.splice(index, 1)
      idTitleMapRef.current.delete(key)
      setSections(clone)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Sections' />
        <div className='scroll'>
          {sections.map((section, index) => (
            <InputAndDelete
              key={index}
              defaultLabel={defaultLabel}
              inputIndex={index}
              inputValue={section}
              onChange={event => handleSectionChange(event, index)}
              onClick={event => handleOnClickInput(event, index)}
              onDelete={handleDelete}
              onBlur={() => handlerInputBlur(index)}
            />
          ))}
        </div>
        <div className='back-two-buttons-container'>
          <Button narrow onClick={handleBackClick}>
            Back
          </Button>
          <Button narrow onClick={handleAddSection}>
            Add Section
          </Button>
        </div>
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Sections
