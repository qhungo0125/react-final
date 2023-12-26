import React from 'react';
import Classes from '../../../../components/AdminTable/Classes/classes';
import useClasses from './state/useClasses';
import { createInvitationCode } from '../../../../api/admin';

const AdminClasses = () => {
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 20,
  });
  const { classes, refetchClasses } = useClasses(pagination);

  const onCreateCode = React.useCallback(async ({ classId }) => {
    console.log('onCreateCode', classId);

    try {
      const response = await createInvitationCode({ classId });
      console.log(response);
      if (response.error) {
        alert(response.error.message);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      refetchClasses();
    }
  }, []);

  return <Classes classes={classes} onCreateCode={onCreateCode} />;
};

export default AdminClasses;
