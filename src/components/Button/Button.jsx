import React, { useState, useRef } from 'react'
import css from './Button.module.css'

const Button = ({
  activeLongPress = false,
  children,
  narrow,
  onPress,
  onLongPress,
  ...props
}) => {
  const [isLongPress, setIsLongPress] = useState(false)
  const timeoutRef = useRef(null)
  const classNames = [css.button]

  if (narrow) {
    classNames.push(css['button-narrow'])
  }

  const handleContextMenu = event => {
    event.preventDefault()
  }
  const handleLongPress = () => setIsLongPress(true)
  const handleMouseDown = () => {
    timeoutRef.current = setTimeout(handleLongPress, 250)
  }
  const handleMouseUp = () => {
    clearTimeout(timeoutRef.current)
    if (isLongPress) {
      setIsLongPress(false)
      onLongPress()
    } else {
      onPress()
    }
  }

  return activeLongPress ? (
    <button
      {...props}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      {children}
    </button>
  ) : (
    <button {...props} className={classNames.join(' ')}>
      {children}
    </button>
  )
}

export default Button
