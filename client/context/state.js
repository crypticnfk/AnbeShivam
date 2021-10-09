import { createContext, useContext, useState, useEffect } from 'react';
import { loadWeb3 } from '../utils/web3-utils';

const AppContext = createContext({
    web3: null
});

export function AppWrapper({ children }) {
  const [web3, setweb3] = useState();

  useEffect(async() => {
    const checkweb3 = async() => {
        const w3 = await loadWeb3();
        setweb3(w3);
    };
    await checkweb3();
  },[web3]);

  return (
    <AppContext.Provider value={{web3}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}