import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputAndDelete from '../components/InputAndDelete/InputAndDelete.jsx'
import Title from '../components/Title/Title.jsx'
import TwoButtons from '../components/TwoButtons/TwoButtons.jsx'
import '../styles/Common.css'
import getKeyByValue from '../utils/getKeyMap.js'
import errorMessageHandler from '../utils/errorMessageHandler.js'
import { fetchApiMethods } from '../api/getMethods.js'

const Sections = () => {
  const navigate = useNavigate()
  const defaultLabel = 'New section'
  const [api, setApi] = useState({})
  const [error, setError] = useState('')
  const [sections, setSections] = useState([])
  const [sectionTitlesToAdd, setSectionTitlesToAdd] = useState([])
  const idTitleMapRef = React.useRef()

  React.useEffect(() => {
    async function fetchData () {
      const api = await fetchApiMethods()
      setApi(api)
      const { sections } = await api.section.findByUser()
      setSections(sections.map(data => data.title))
      const map = new Map()
      sections.forEach(x => map.set(x.id, x.title))
      idTitleMapRef.current = map
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddSection = () => {
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
        cleanSectionTitlesToAdd.map(title => api.section.create({ title }))
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
      setError(errorMessageHandler(error))
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
      setError(errorMessageHandler(error))
    }
  }

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Sections' />
        <div className='scroll'>
          {sections.length ? (
            sections.map((section, index) => (
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
            ))
          ) : (
            <strong className='gray-element element-value'>No sections</strong>
          )}
        </div>
        <TwoButtons
          leftTitle='Back'
          handleLeftClick={handleBackClick}
          rightTitle='Add Section'
          handleRightClick={handleAddSection}
        />
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default Sections
