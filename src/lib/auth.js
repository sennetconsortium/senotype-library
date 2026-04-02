import { cookies } from 'next/headers'
import log from 'xac-loglevel'

const getAuth = async () => {
  const cookieStore = await cookies()
  const info = cookieStore.get('info')
  try {
    const auth = JSON.parse(atob(info.value))
    log.debug('lib.getAuth', auth)
    return auth
  } catch(e) {
    log.error('lib.getAuth.error', e)
  }
  return {}
}

export default getAuth