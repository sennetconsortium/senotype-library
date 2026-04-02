import { createContext, useEffect, useState } from 'react'

const AppContext = createContext({})

export const AppProvider = ({ children, auth }) => {
  const [authInfo, setAuthInfo] = useState({})
  const fetchAuthInfo = async () => {
    setAuthInfo(await auth)
  }

  useEffect(() => {
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