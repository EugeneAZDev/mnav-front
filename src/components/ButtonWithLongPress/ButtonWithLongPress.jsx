import React, { useState, useRef } from 'react';

const ButtonWithLongPress = ({ children, onPress, onLongPress, ...props }) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const timeoutRef = useRef(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  const handleLongPress = () => setIsLongPress(true)
  const handleMouseDown = () => {
    timeoutRef.current = setTimeout(handleLongPress, 350);
  };
  const handleMouseUp = () => {
    clearTimeout(timeoutRef.current);
    if (isLongPress) {
      setIsLongPress(false);
      onLongPress()
    } else {
      onPress()
    }
  };

  return (
    <button {...props}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      {children}
    </button>
  );
};

export default ButtonWithLongPress;
