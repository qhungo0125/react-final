import React from 'react';
import { getAccounts } from '../../../../../api/admin';

const useTeachers = () => {
  const [teachers, setTeachers] = React.useState({
    data: [],
    isLoading: true,
  });
  React.useEffect(() => {
    const getTeachers = async () => {
      try {
        setTeachers((state) => ({
          ...state,
          isLoading: true,
        }));

        const response = await getAccounts({
          page: 1,
          limit: 10,
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
    getTeachers();
  }, []);
  return { teachers };
};

export default useTeachers;
