import React, { createContext, useState, useEffect } from 'react'
import getApiMethods from '../api'

const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    async function fetchData () {
      const result = await getApiMethods()
      setData(result)
    }
    fetchData()
  }, [])

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  )
}

export default GlobalContext
