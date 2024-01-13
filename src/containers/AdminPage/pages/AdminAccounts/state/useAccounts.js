import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAccounts } from '../../../../../api/admin';
import { createArrayFrom1ToN } from '../../../../../utils/format';

const useAccounts = (props) => {
  const { page = 1, limit = 10, role } = props;
  const [pages, setPages] = React.useState([]);
  const [accounts, setAccounts] = React.useState({
    data: [],
    isLoading: true,
  });

  const getAccountsData = React.useCallback(async () => {
    try {
      setAccounts((state) => ({
        ...state,
        isLoading: true,
      }));

      const response = await getAccounts({
        page,
        limit,
        role: role === 'student' ? 'student' : 'teacher',
      });

      if (response.error) {
        console.log(response.error.message);
        return;
      }

      if (response.data && response.data.accounts) {
        setAccounts({
          data: response.data.accounts,
          isLoading: false,
        });
        const pages = createArrayFrom1ToN(response.data.pages);
        setPages(pages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAccounts((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  }, [page, limit, role]);

  React.useEffect(() => {
    getAccountsData();
  }, [page, limit, role]);

  return { accounts, refetchAccounts: getAccountsData, pages };
};

export default useAccounts;
