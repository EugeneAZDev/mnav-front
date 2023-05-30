import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Loader from '../components/Loader/Loader'
import Title from '../components/Title/Title'
import ApiContext from '../context/api.js'
import '../styles/Common.css'
import '../styles/Exchange.css'

const Export = () => {
  const navigate = useNavigate()
  const api = React.useContext(ApiContext)
  const [loading, setLoading] = React.useState(false)
  
  const handleDownload = async () => {
    setLoading(true)
    const buffer = await api.exchange.export()    
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const filename = 'MyActivities.xlsx'
    const url = URL.createObjectURL(blob)
 
    const link = document.createElement('a')
    link.href = url
    link.download = filename

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setLoading(false)
  }

  return (
    <div className='item-form'>
      <div className='item-form-content'>
        <Title text='Export' />
        {loading ? (
          <Loader />
        ) : (
          <div className='button-container'>
            <Button onClick={handleDownload}>Download</Button>
            <Button onClick={() => navigate('/menu')}>
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Export
