import React from 'react'
import getApiMethods from '../api'

const ApiContext = React.createContext(null)

export const ApiProvider = ({ children }) => {
  const [data, setData] = React.useState(null)

  async function fetchApi() {
    const result = await getApiMethods()
    setData(result)
  }
  
  React.useEffect(() => {
    const interval = setInterval(fetchApi, 24 * 60 * 60 * 1000)
    fetchApi()
    return () => {
      clearInterval(interval)
    }
  }, [])

  const cachedData = React.useMemo(() => data, [data])

  return (
    <ApiContext.Provider value={cachedData}>{children}</ApiContext.Provider>
  )
}

export default ApiContext
