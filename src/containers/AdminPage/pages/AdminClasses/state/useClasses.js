import React from 'react';
import { getClasses } from '../../../../../api/admin';

const useClasses = (props) => {
  const { page = 1, limit = 10 } = props;

  const [classes, setClasses] = React.useState([]);

  const getClassesData = React.useCallback(async () => {
    try {
      const response = await getClasses({ page, limit });
      if (response && response.data && response.data.classes) {
        setClasses(response.data.classes);
      }
    } catch (error) {
    } finally {
    }
  }, []);

  React.useEffect(() => {
    getClassesData();
  }, []);

  return {
    classes,
    refetchClasses: getClassesData,
  };
};

export default useClasses;
