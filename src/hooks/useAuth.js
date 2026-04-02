import { useEffect, useState } from 'react'
import log from 'xac-loglevel'

function useAuth({ authInfo }) {
    const [_authInfo, setAuthInfo] = useState(authInfo)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [user, setUser] = useState({})
    const [userGroups, setUserGroups] = useState([])
    
  useEffect(() => {
    // TODO: do other token checking?
    log.debug('hooks.useAuth', _authInfo)
    if (_authInfo.email) {
      setIsAuthorized(true)
    }

    return () => {

    }
  }, [_authInfo])
  
  return { isAuthorized, authInfo: _authInfo, setAuthInfo }
}

export default useAuth
