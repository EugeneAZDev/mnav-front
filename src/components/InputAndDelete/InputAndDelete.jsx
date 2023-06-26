import React, { useState } from 'react'
import css from './InputAndDelete.module.css'
import deleteIcon from '../../images/delete.png'

const InputAndDelete = ({
  inputIndex,
  inputValue,
  onBlur,
  onChange,
  onClick,
  onDelete,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState('')

  const handleInputChange = event => {
    setValue(event.target.value)
    onChange(event, inputIndex)
  }

  const handleButtonDeleteClick = () => {
    onDelete(inputIndex)
  }

  const handleInputOnClick = event => {
    onClick(event, inputIndex)
  }

  const handleInputOnBlur = () => {
    onBlur(inputIndex)
  }

  return (
    <div>
      <input
        key={inputIndex}
        className={css.input}
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputOnClick}
        onBlur={handleInputOnBlur}
      />
      <img
        className={css.image}
        src={deleteIcon}
        alt='Delete'
        onClick={handleButtonDeleteClick}
      />
    </div>
  )
}

export default InputAndDelete
