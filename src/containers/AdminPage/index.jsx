import React from 'react';
import ResponsiveDrawer from './appBar';
import { ADMIN_PAGES } from '../../constant';
import Admin from './admin';


const AdminPage = () => {
  console.log("render");
  const [state, setState] = React.useState(ADMIN_PAGES[0]);
  const handleItemClick = React.useCallback((value)=>{
    setState(value)
  },[])

  return (
    <ResponsiveDrawer handleItemClick={handleItemClick}>
      <Admin name={state} />
    </ResponsiveDrawer>
  );
};

export default AdminPage;
