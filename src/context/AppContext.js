import URLS from '@/lib/urls'
import { createContext, useEffect, useState } from 'react'

const AppContext = createContext({})

export const AppProvider = ({ children, auth }) => {
  const [authInfo, setAuthInfo] = useState({})
  const [ontology, setOntology] = useState(null)
  const fetchAuthInfo = async () => {
    setAuthInfo(await auth)
  }

  const fetchOntology = async () => {
    if (!sessionStorage.getItem('oneTimeInit')) {
      const response = await fetch(URLS.api.local('ontology'))
      if (response.ok) {
        const result = await response.json()
        if (Object.keys(result.ontology).length) {
          window.ONTOLOGY_CACHE = result.ontology
          setOntology(result.ontology)
          sessionStorage.setItem('oneTimeInit', true)
        }
      }
   }
    
  }

  useEffect(() => {
    fetchOntology()
    fetchAuthInfo()
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