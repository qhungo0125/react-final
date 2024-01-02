import React from 'react';
import { getClasses } from '../../../../../api/admin';
import { createArrayFrom1ToN } from '../../../../../utils/format';

const useClasses = (props) => {
  // pagination
  const { pagination } = props;
  const { page = 1, limit = 10 } = pagination;
  const [pages, setPages] = React.useState([]);

  // data and loading
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // function handlers
  const getClassesData = React.useCallback(
    async ({ sort, filter }) => {
      try {
        setLoading(true);
        const response = await getClasses({ page, limit, sort, filter });
        if (response && response.data && response.data.classes) {
          setClasses(response.data.classes);
          const pages = createArrayFrom1ToN(response.data.pages);
          setPages(pages);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [page, limit],
  );

  React.useEffect(() => {
    getClassesData({ page, limit });
  }, [page, limit]);

  return {
    classes,
    refetchClasses: getClassesData,
    pages,
    loading,
  };
};

export default useClasses;
