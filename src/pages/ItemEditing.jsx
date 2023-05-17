import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import GlobalContext from '../context/global.js'

import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'
import ComboBox from '../components/ComboBox/ComboBox'
import DoubleComboBox from '../components/DoubleComboBox/DoubleComboBox'

import '../styles/Common.css'
import equalPlainObjects from '../utils/equalPlainObjects.js'

const ItemEditing = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const api = React.useContext(GlobalContext)

  const [description, setDescription] = useState('')
  const [editMode, setIsEditMode] = useState(false)
  const [initialItem, setInitialItem] = useState({})
  const [initialTitle, setInitialTitle] = useState('')
  const [initialValueType, setInitialValueType] = useState('')
  const [loading, setIsLoading] = useState(true)
  const [sections, setSections] = useState([])
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedVariation, setSelectedVariation] = useState('Positive')
  const [selectedValueType, setSelectedValueType] = useState('number')
  const [target, setTarget] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const variations = ['Positive', 'Negative']

  const existedItemsRef = useRef()
  const sectionListRef = useRef()
  const typeListRef = useRef()

  React.useEffect(() => {
    async function fetchData () {
      try {
        const items = await api.item.findByUser()
        const typeList = await api.item.getValueType()
        const sectionList = await api.section.findByUser()
        setSections(sectionList.map(data => data.title))
        sectionListRef.current = sectionList
        typeListRef.current = typeList
        existedItemsRef.current = items.map(item => item.title)
        const item = items.find(item => item.id === id)
        const {
          title,
          description,
          target,
          sectionId,
          valueVariation,
          valueType
        } = item
        setInitialItem({
          title,
          description,
          target,
          sectionId,
          valueVariation,
          valueType
        })
        if (id && item) {
          const selectedSection = sectionList.find(
            section => section.id === item.sectionId
          )
          const sectionTitle = selectedSection.title
          setDescription(item.description)
          setTarget(item.target)
          setTitle(item.title)
          setInitialTitle(item.title)
          setInitialValueType(item.title)
          setSelectedSection(sectionTitle)
          setSelectedValueType(item.valueType)
          setSelectedVariation(item.valueVariation)
          setIsEditMode(true)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
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

    if (!title) {
      setError('"Name of the Item" field is required')
      return
    }

    if (
      existedItemsRef.current.includes(title) &&
      (!editMode || title !== initialTitle)
    ) {
      setError(`Item already exists`)
      return
    }

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
              placeholder='Name of the Item'
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
        <div className='back-two-buttons-container'>
          <Button narrow onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button narrow onClick={handleSaveClick}>
            Save
          </Button>
        </div>
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default ItemEditing
