import React from 'react';
import { getClasses } from '../../../../../api/admin';
import { createArrayFrom1ToN } from '../../../../../utils/format';

const useClasses = (props) => {
  const { page = 1, limit = 10 } = props;
  const [classes, setClasses] = React.useState([]);
  const [pages, setPages] = React.useState([]);

  const getClassesData = React.useCallback(async () => {
    try {
      const response = await getClasses({ page, limit });
      if (response && response.data && response.data.classes) {
        setClasses(response.data.classes);
        const pages = createArrayFrom1ToN(response.data.pages);
        setPages(pages);
      }
    } catch (error) {
    } finally {
    }
  }, [page, limit]);

  React.useEffect(() => {
    getClassesData({ page, limit });
  }, [page, limit]);

  return {
    classes,
    refetchClasses: getClassesData,
    pages,
  };
};

export default useClasses;
