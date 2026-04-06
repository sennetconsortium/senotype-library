import log from 'xac-loglevel'
import ENVS from './envs'
import path from 'path'
import {promises as fs} from 'fs'
import URLS from './urls'

const ONTOLOGY_CACHE_PATH = path.join(process.cwd(), 'src/cache')

const createFile = async (filePath, data, prefix = '') => {
    await fs.mkdir(path.dirname(filePath), {recursive: true}).then(function () {
        fs.writeFile(filePath, prefix + JSON.stringify(data), 'utf8')
    })
}


const ONTOLOGY = {
  fetch: async (codes, code) => {
    const path = codes[code].path || ENVS.ontology.valueset.replaceAll('{code}', codes[code])
    log.debug('ONTOLOGY.fetch', path)
    const url = URLS.api.ontology + path 
    const response = await fetch(url)
    if (response.ok) {
      return {
        [code]: await response.json()
      }
    }
    return null
  },
  fetchAll: async () => {
    try {
      log.info('Ontology.fetchAll', '...')
      const codes = JSON.parse(ENVS.ontology.codes) 
      const results = await Promise.all(
        Object.keys(codes).map((code) => ONTOLOGY.fetch(codes, code))
      )
      return results
    } catch (e) {
      log.error('Error.Ontology.fetch', e)
    }
  },
  buildCache: async () => {
    const filePath = ONTOLOGY_CACHE_PATH + '/ontology.js';
    let ontologyJson
    try {
      log.info('Ontology.buildCache', '...', filePath)
      ontologyJson = await import('@/cache/ontology.js')
      //const ontologyJson = await fs.readFile(filePath, 'utf8')
      
    } catch (e) {
      log.error('Error.Ontology.buildCache', e)
      try {
         log.info('Ontology.buildCache', 'Creating ...')
          const results = await ONTOLOGY.fetchAll();
          let ontologyResults = {}
          for (const r of results) {
            for (const c in r) {
              ontologyResults[c] = r[c]
            }
          }
          await createFile(filePath, ontologyResults, 'export const ontologyJson=')
          ontologyJson = await import('@/cache/ontology.js')
      } catch (e) {
        log.error('Error.Ontology.buildCache.catch', e)
      }
    }
    return ontologyJson
  }
}

export default ONTOLOGY