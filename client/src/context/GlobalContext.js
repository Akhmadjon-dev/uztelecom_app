import { createContext } from 'react';

const GlobalContext = createContext({
  lang: 'en', userType: 'admin'
});

export default GlobalContext;