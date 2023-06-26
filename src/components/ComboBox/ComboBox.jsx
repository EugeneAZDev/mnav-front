import React from 'react'
import Edit from '../Edit/Edit'
import css from './ComboBox.module.css'

const ComboBox = ({
  title,
  options,
  value,
  handleComboBoxChange,
  handleEditClick
}) => {
  return (
    <div className={css.div}>
      <label className={css.label}>{title}</label>
      <select
        id='combo-box'
        className={`${css.select} select`}
        value={value}
        onChange={handleComboBoxChange}
      >
        <option key='none' className={`${css.option} option`} value=''>
          None
        </option>
        {options.map((option, index) => (
          <option key={index} className={`${css.option} option`} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Edit onClick={handleEditClick} />
    </div>
  )
}

export default ComboBox
