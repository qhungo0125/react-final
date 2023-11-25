import React from 'react';
import { STUDENT_ROLE } from '../constant';

const AppContext = React.createContext();

const GlobalContext = ({ children }) => {
  const [loginState, setLoginState] = React.useState({
    isLogin: false,
    role: STUDENT_ROLE,
  });

  const value = React.useMemo({ loginState }, [loginState]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default GlobalContext;

export const useGlobal = () => {
  const value = React.useContext(AppContext);
  return value;
};
