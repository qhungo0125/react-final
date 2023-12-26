import React from 'react';
import { getAccounts } from '../../../../../api/admin';

const useTeachers = (props) => {
  const { page = 1, limit = 10 } = props;

  const [teachers, setTeachers] = React.useState({
    data: [],
    isLoading: true,
  });

  const getTeachers = async () => {
    try {
      setTeachers((state) => ({
        ...state,
        isLoading: true,
      }));

      const response = await getAccounts({
        page,
        limit,
        role: 'teacher',
      });

      if (response.error) {
        console.log(response.error.message);
        return;
      }

      if (response.data && response.data.accounts) {
        setTeachers({
          data: response.data.accounts,
          isLoading: false,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTeachers((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  };

  React.useEffect(() => {
    getTeachers();
  }, []);
  return { teachers, refetchTeachers: getTeachers };
};

export default useTeachers;
