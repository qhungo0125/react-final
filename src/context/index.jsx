import React from 'react';
import { STUDENT_ROLE } from '../constant';
import { useTranslation } from 'react-i18next';

const AppContext = React.createContext();

const GlobalContext = ({ children }) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = React.useState('vi');
  const [socketNotif, setSocketNotif] = React.useState(null);
  const [loginState, setLoginState] = React.useState({
    isLogin: false,
    role: STUDENT_ROLE,
  });

  React.useEffect(() => {
    const locale = localStorage.getItem('locale') || 'vi';
    changeLanguage(locale);
  }, []);

  const changeLanguage = (locale) => {
    i18n.changeLanguage(locale);
    localStorage.setItem('locale', locale);
    setLocale(locale);
  };
  const changeSocketNotif = (value) => {
    setSocketNotif(value);
  };

  const value = React.useMemo(
    () => ({
      loginState,
      changeLanguage,
      changeSocketNotif,
      socketNotif,
    }),
    [loginState, locale, socketNotif],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default GlobalContext;

export const useGlobal = () => {
  const value = React.useContext(AppContext);
  return value;
};
