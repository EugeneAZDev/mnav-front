import React from 'react'
import Label from '../../components/Label/Label'
import editIcon from '../../images/edit.png'
import css from './ComboBox.module.css'

const ComboBox = ({
  options,
  selectedOption,
  handleOptionChange,
  handleEditSectionsClick
}) => {
  return (
    <div className={css.div}>
      <Label text='Sections' />
      <select
        id='combo-box'
        className={`${css.select} select`}
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option key='none' className={`${css.option} option`} value=''>
          None
        </option>
        {options.map(option => (
          <option key={option} className={`${css.option} option`} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        className={css.image}
        src={editIcon}
        alt='Edit'
        onClick={handleEditSectionsClick}
      />
    </div>
  )
}

export default ComboBox
