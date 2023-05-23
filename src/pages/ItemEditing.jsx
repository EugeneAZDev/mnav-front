import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ApiContext from '../context/api.js'

import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'
import ComboBox from '../components/ComboBox/ComboBox'
import DoubleComboBox from '../components/DoubleComboBox/DoubleComboBox'
import TwoButtons from '../components/TwoButtons/TwoButtons.jsx'

import '../styles/Common.css'
import equalPlainObjects from '../utils/equalPlainObjects.js'
import errorMessageHandler from '../utils/errorMessageHandler.js'

const ItemEditing = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const api = React.useContext(ApiContext)

  const [description, setDescription] = useState('')
  const [editMode, setIsEditMode] = useState(false)
  const [initialItem, setInitialItem] = useState({})
  const [initialTitle, setInitialTitle] = useState('')
  const [initialValueType, setInitialValueType] = useState('')
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState([])
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedVariation, setSelectedVariation] = useState('Positive')
  const [selectedValueType, setSelectedValueType] = useState('number')
  const [target, setTarget] = useState(undefined)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const variations = ['Positive', 'Negative']

  const existedItemsRef = useRef()
  const sectionListRef = useRef()
  const typeListRef = useRef()

  React.useEffect(() => {
    async function fetchData () {
      try {
        const { items } = await api.item.findByUser()
        const { types } = await api.item.getValueType()
        typeListRef.current = types
        const { sections } = await api.section.findByUser()
        const sectionTitles = sections
          ? sections.map(data => data.title)
          : ['None']
        sectionListRef.current = sectionTitles
        setSections(sectionTitles)
        existedItemsRef.current = items.map(item => item.title)
        const item = items.find(item => item.id === id)
        if (id && item) {
          setIsEditMode(true)
          const { title, description, target, sectionId, valueVariation, valueType } = item
          setInitialItem({ title, description, target, sectionId, valueVariation, valueType })
          if (sectionId !== null) {
            const selectedSection = sections.find(
              section => section.id === item.sectionId
            )
            const sectionTitle = selectedSection.title
            setSelectedSection(sectionTitle)
          }
          setDescription(description)
          setTarget(target)
          setTitle(title)
          setInitialTitle(title)
          setInitialValueType(valueType)
          setSelectedValueType(valueType)
          setSelectedVariation(valueVariation)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(errorMessageHandler(error))
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCancelClick = () => {
    editMode ? navigate(`/items/${id}`) : navigate('/today')
  }

  const handleDescriptionChange = event => setDescription(event.target.value)

  const handleEditSectionsClick = () => {
    navigate('/sections')
  }

  const handleTitleChange = event => setTitle(event.target.value)
  const handleTargetChange = event => setTarget(event.target.value)
  const handleSectionChange = event => setSelectedSection(event.target.value)
  const handleValueTypeChange = event =>
    setSelectedValueType(event.target.value)
  const handleVariationChange = event =>
    setSelectedVariation(event.target.value)

  const handleSaveClick = async () => {
    setError('')
    const section = sectionListRef.current.filter(
      section => section.title === selectedSection
    )
    const sectionId = section && section[0]?.id
    const valueVariation = Boolean(selectedVariation)
    const valueType = selectedValueType

    if (
      editMode &&
      ((valueType !== initialValueType && valueType === 'text') ||
        (initialValueType === 'text' && valueType !== 'text'))
    ) {
      setError('Type value must be consistent')
      return
    }

    if (!title) {
      setError('Title field is required')
      return
    }

    if (
      existedItemsRef.current.includes(title) &&
      (!editMode || title !== initialTitle)
    ) {
      setError(`Item already exists`)
      return
    }

    if (title.length > 11) {
      setError('Title exceeds maximum length: 11 characters')
      return
    }

    setLoading(true)
    try {
      const item = {
        title,
        description,
        target,
        sectionId,
        valueVariation,
        valueType
      }
      if (editMode) {
        if (!equalPlainObjects(initialItem, item)) {
          await api.item.update({ id, ...item })
        }
        navigate(`/items/${id}`)
      } else {
        await api.item.create(item)
        navigate('/today')
      }
    } catch (e) {
      setLoading(false)
      setError(e)
    }
  }

  return (
    <div className='form'>
      <div className='form-content'>
        <Title text='Item Editing Form' />
        {loading ? (
          <Loader />
        ) : (
          <>
            <input
              id='title'
              type='text'
              placeholder='Title of the Item'
              value={title}
              onChange={handleTitleChange}
            />
            <input
              id='description'
              type='text'
              placeholder='Description of the Item'
              value={description}
              onChange={handleDescriptionChange}
            />
            <input
              id='target'
              type='text'
              placeholder='Target value'
              value={target}
              onChange={handleTargetChange}
            />
            <ComboBox
              title='Sections'
              options={loading ? [] : sections}
              value={selectedSection}
              handleComboBoxChange={handleSectionChange}
              handleEditClick={handleEditSectionsClick}
            />
            <DoubleComboBox
              title='Type of value'
              options={loading ? [] : typeListRef.current}
              options2={loading ? [] : variations}
              value={selectedValueType}
              value2={selectedVariation}
              handleChange={handleValueTypeChange}
              handleChange2={handleVariationChange}
            />
          </>
        )}
        <TwoButtons
          leftTitle='Cancel'
          handleLeftClick={handleCancelClick}
          rightTitle='Save'
          handleRightClick={handleSaveClick}
        />
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default ItemEditing
