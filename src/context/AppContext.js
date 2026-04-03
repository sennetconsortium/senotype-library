import URLS from '@/lib/urls'
import { createContext, useEffect, useState } from 'react'

const AppContext = createContext({})

export const AppProvider = ({ children, auth }) => {
  const [authInfo, setAuthInfo] = useState({})
  const fetchAuthInfo = async () => {
    setAuthInfo(await auth)
  }

  const fetchOntology = async () => {
    await fetch(URLS.api.local('ontology'))
  }

  useEffect(() => {
    fetchAuthInfo()
    fetchOntology()
  }, [authInfo])

  return (
    <AppContext.Provider
      value={{
        authInfo
      }}>{children}
    </AppContext.Provider>
  )
}

export default AppContext