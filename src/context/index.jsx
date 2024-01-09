import React from 'react';
import { STUDENT_ROLE } from '../constant';
import { useTranslation } from 'react-i18next';
import { getNotifications } from '../api/notification';
const AppContext = React.createContext();

const GlobalContext = ({ children }) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = React.useState('vi');
  const [socketNotif, setSocketNotif] = React.useState(null);
  const [loginState, setLoginState] = React.useState({
    isLogin: false,
    role: STUDENT_ROLE,
  });
  const [notification, setNotification] = React.useState(null);
  console.log(notification);
  React.useEffect(() => {
    const getData = async () => {
      const resp = await getNotifications({
        userId: localStorage.getItem('userid'),
      });
      // console.log(resp);
      setNotification(resp.data);
    };
    getData();
  }, []);

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
      notification,
    }),
    [loginState, locale, socketNotif, notification],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default GlobalContext;

export const useGlobal = () => {
  const value = React.useContext(AppContext);
  return value;
};
