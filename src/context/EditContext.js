import { createContext, useState, useMemo } from 'react';
import log from 'xac-loglevel';

const EditContext = createContext({});

export const EditProvider = ({ children, data }) => {
  
  const senotype = useMemo(
    () => {
      log.debug('EditProvider.useMemo', data);
      return data
    },
    [data],
  );

  return (
    <EditContext.Provider
      value={{
        senotype,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;
