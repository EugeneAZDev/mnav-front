import React from 'react'
import getApiMethods from '../api'

const ApiContext = React.createContext(null)

export const ApiProvider = ({ children }) => {
  const [data, setData] = React.useState(null)

  async function fetchApi() {
    console.log(`run fetchApi, ${Date.now()}`)
    const result = await getApiMethods()
    setData(result)
  }
  
  React.useEffect(() => {
    const interval = setInterval(fetchApi, 1 * 60 * 60 * 1000)
    fetchApi()
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <ApiContext.Provider value={data}>{children}</ApiContext.Provider>
  )
}

export default ApiContext
