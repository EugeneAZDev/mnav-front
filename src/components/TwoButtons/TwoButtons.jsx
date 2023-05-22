import React from 'react'
import Button from '../Button/Button'
import css from './TwoButtons.module.css'

const TwoButtons = ({ leftTitle, handleLeftClick, rightTitle, handleRightClick }) => {
  return (
    <div className={css.buttonsContainer}>
      <Button narrow onClick={handleLeftClick}>
        {leftTitle}
      </Button>
      <Button narrow onClick={handleRightClick}>
        {rightTitle}
      </Button>
    </div>
  )
}

export default TwoButtons
