import React from 'react'
import css from './DoubleComboBox.module.css'

const DoubleComboBox = ({
  title,
  options,
  options2,
  value,
  value2,
  handleChange,
  handleChange2,
}) => {
  return (
    <div className={css.div}>
      <label className={css.label}>{title}</label>
      <select
        id='double-combo-box-1'
        className={`${css.select} select`}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} className={`${css.option} option`} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        id='double-combo-box-2'
        className={`${css.select} select`}
        value={value2}
        onChange={handleChange2}
      >
        {options2.map((option, index) => (
          <option key={index} className={`${css.option} option`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DoubleComboBox
