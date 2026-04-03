import { cookies } from 'next/headers'
import log from 'xac-loglevel'

const getAuth = async () => {
  const cookieStore = await cookies()
  const info = cookieStore.get('info')
  if (!info) return {}
  try {
    const auth = JSON.parse(atob(info?.value))
    log.debug('lib.getAuth', auth)
    return auth
  } catch(e) {
    log.error('lib.getAuth.error', e)
  }
  return {}
}

export const getToken = async () => (await getAuth()).groups_token

export default getAuth