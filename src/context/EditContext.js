import API from '@/lib/api';
import ENVS from '@/lib/envs';
import { createContext, useMemo } from 'react';
import log from 'xac-loglevel';

const EditContext = createContext({});

export const EditProvider = ({ children, data }) => {

  const senotypePredicates = [
    {
      field: 'has_hallmark',
      label: 'Hallmark',
      ui: { required: true },
    },
    {
      field: 'has_inducer',
      label: 'Inducer',
      ui: {},
    },
    {
      field: 'has_microenvironment',
      label: 'Microenvironment',
      ui: {},
    },
  ];

  const senotypeOntologyPromise = useMemo(async () => {
    const result = {};
    let query;
    for (const p of senotypePredicates) {
      query = {
        size: 0,
        aggs: {
          ontology: {
            terms: {
              field: `${p.field}.term.keyword`,
              size: 1000,
            },
            aggs: {
              detail: {
                top_hits: {
                  size: 1,
                  _source: {
                    includes: [`${p.field}.code`],
                  },
                },
              },
            },
          },
        },
      };
      result[p.field] = await API.search(query, ENVS.index.senotype);
    }
    log.debug('EditProvider.useMemo.senotypeLibOntology', result);
    return result;
  }, []);

  
  const senotype = useMemo(
    () => {
      log.debug('EditProvider.useMemo.senotype', data);
      return data
    },
    [data],
  );

  return (
    <EditContext.Provider
      value={{
        senotype,
        senotypeOntologyPromise,
        senotypePredicates,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;
