import React, { useState } from 'react'
import css from './InputAndDelete.module.css'
import deleteIcon from '../../images/delete.png'

const InputAndDelete = ({
  inputIndex,
  inputValue,
  onChange,
  onClick,
  onDelete
}) => {
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

  return (
    <div>
      <input
        key={inputIndex}
        className={css.input}
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputOnClick}
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
