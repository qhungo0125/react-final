import React from 'react';
import { getAccounts } from '../../../../../api/admin';

const useStudents = (props) => {
  const { page = 1, limit = 10 } = props;
  const [students, setStudents] = React.useState({
    data: [],
    isLoading: true,
  });

  const getStudents = React.useCallback(async () => {
    try {
      setStudents((state) => ({
        ...state,
        isLoading: true,
      }));
      const response = await getAccounts({
        page,
        limit,
        role: 'student',
      });

      if (response.error) {
        console.log(response.error.message);
        return;
      }

      if (response.data && response.data.accounts) {
        setStudents((state) => ({
          data: [...state.data, ...response.data.accounts],
          isLoading: false,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStudents((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  }, []);

  React.useEffect(() => {
    getStudents();
  }, []);

  return { students, refetchStudents: getStudents };
};

export default useStudents;
