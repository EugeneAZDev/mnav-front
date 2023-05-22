import React from 'react'
import arrowUp from '../../images/arrow-up.png'
import arrowDown from '../../images/arrow-down.png'
import css from './EditNumber.module.css'
const EditNumber = ({ value, handleUp, handleDown }) => {
  return (
    <div className={css.editValue}>
      <div>
        <img
          src={arrowUp}
          alt='Up'
          className='edit-image'
          onClick={handleUp}
        />
      </div>
      <div>
        <h1>{value}</h1>
      </div>
      <div>
        <img
          src={arrowDown}
          alt='Down'
          className='edit-image'
          onClick={handleDown}
        />
      </div>
    </div>
  )
}

export default EditNumber
