import React from 'react'
import css from './FileUploader.module.css'

const FileUploader = React.forwardRef(({ handleChange }, ref) => {
  return (
    <div className={css.fileInput}>
      <button className={css.chooseButton}>Choose File</button>
      <input
        className={css.nativeInput}
        type='file'
        accept=".xlsx"
        ref={ref}
        onChange={handleChange}
      />
    </div>
  )
})

export default FileUploader
