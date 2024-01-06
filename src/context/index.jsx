import React from 'react';
import { STUDENT_ROLE } from '../constant';
import { useTranslation } from 'react-i18next';

const AppContext = React.createContext();

const GlobalContext = ({ children }) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = React.useState('vi');

  React.useEffect(() => {
    const locale = localStorage.getItem('locale') || 'vi';
    changeLanguage(locale);
  }, []);

  const changeLanguage = (locale) => {
    i18n.changeLanguage(locale);
    localStorage.setItem('locale', locale);
    setLocale(locale);
  };

  const [loginState, setLoginState] = React.useState({
    isLogin: false,
    role: STUDENT_ROLE,
  });

  const value = React.useMemo(
    () => ({ loginState, changeLanguage }),
    [loginState],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default GlobalContext;

export const useGlobal = () => {
  const value = React.useContext(AppContext);
  return value;
};
