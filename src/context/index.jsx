import React from 'react';
import { useTranslation } from 'react-i18next';
import { getNotifications } from '../api/notification';
import { AuthenticationAPI } from '../api/authentication';

const AppContext = React.createContext();

const GlobalContext = ({ children }) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = React.useState('vi');
  const [socketNotif, setSocketNotif] = React.useState(null);
  const [notification, setNotification] = React.useState(null);

  React.useEffect(() => {
    const getDataNotif = async () => {
      const resp = await getNotifications({
        userId: localStorage.getItem('userid'),
      });
      // console.log(resp);
      setNotification(resp.data);
    };
    getDataNotif();
  }, [socketNotif]);

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
      changeLanguage,
      changeSocketNotif,
      socketNotif,
      notification,
    }),
    [locale, socketNotif, notification],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default GlobalContext;

export const useGlobal = () => {
  const value = React.useContext(AppContext);
  return value;
};
