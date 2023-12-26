import React from 'react';
import { getAccounts } from '../../../../../api/admin';

const useStudents = () => {
  const [students, setStudents] = React.useState({
    data: [],
    isLoading: true,
  });

  React.useEffect(() => {
    const getStudents = async () => {
      try {
        setStudents((state) => ({
          ...state,
          isLoading: true,
        }));
        const response = await getAccounts({
          page: 1,
          limit: 10,
          role: 'student',
        });

        if (response.error) {
          console.log(response.error.message);
          return;
        }

        if (response.data && response.data.accounts) {
          setStudents({
            data: response.data.accounts,
            isLoading: false,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setStudents((state) => ({
          ...state,
          isLoading: false,
        }));
      }
    };
    getStudents();
  }, []);

  return { students };
};

export default useStudents;
