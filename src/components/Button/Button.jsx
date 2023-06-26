import React, { useState, useRef, useEffect } from 'react'
import css from './Button.module.css'

const DELAY = 500

const Button = ({
  activeLongPress = false,
  children,
  narrow,
  onPress,
  onLongPress,
  ...props
}) => {
  const [isLongPress, setIsLongPress] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const timeoutRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const isTouchMoved = useRef(false)
  const classNames = [css.button]

  if (narrow) {
    classNames.push(css['button-narrow'])
  }

  const handleContextMenu = event => {
    event.preventDefault()
  }

  const handleLongPress = () => {
    if (!isScrolling) {
      setIsLongPress(true)
      onLongPress()
    }
  }

  const handlePress = () => {
    setIsLongPress(false)
    onPress()
  }

  const handleMouseDown = () => {
    timeoutRef.current = setTimeout(handleLongPress, DELAY)
  }

  const handleMouseUp = () => {
    clearTimeout(timeoutRef.current)
    handlePress()
  }

  const handleTouchStart = () => {
    timeoutRef.current = setTimeout(handleLongPress, DELAY)
  }

  const handleTouchMove = () => {
    isTouchMoved.current = true
  }

  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current)
    if (!isTouchMoved.current) {
      handlePress()
    }
    isTouchMoved.current = false
  }

  const handleTouchCancel = () => {
    clearTimeout(timeoutRef.current)
    setIsLongPress(false)
  }

  useEffect(() => {
    const handleScrollStart = () => {
      setIsScrolling(true)
      clearTimeout(timeoutRef.current)
    }

    const handleScrollEnd = () => {
      setIsScrolling(false)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setIsLongPress(false)
      }, DELAY)
    }

    window.addEventListener('scroll', handleScrollStart, { passive: true })
    window.addEventListener('touchmove', handleScrollStart, { passive: true })
    window.addEventListener('scroll', handleScrollEnd, { capture: true })
    window.addEventListener('touchmove', handleScrollEnd, { capture: true })

    return () => {
      window.removeEventListener('scroll', handleScrollStart, { passive: true })
      window.removeEventListener('touchmove', handleScrollStart, { passive: true })
      window.removeEventListener('scroll', handleScrollEnd, { capture: true })
      window.removeEventListener('touchmove', handleScrollEnd, { capture: true })
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleScrollCapture = () => {
    clearTimeout(timeoutRef.current)
    setIsLongPress(false)
  }

  return activeLongPress ? (
    <button
      {...props}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onContextMenu={handleContextMenu}
      onScrollCapture={handleScrollCapture}
      onWheelCapture={handleScrollCapture}
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