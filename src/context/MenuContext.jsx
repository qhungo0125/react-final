import { useState, createContext } from 'react';

const MenuContext = createContext({
  tab: 'home',
  classTab: 'stream',
  displayClassTab: false,
  handleTabChanges: () => {},
  handleClassTabChanges: () => {},
});

function MenuProvider({ children }) {
  const [tab, setTab] = useState('home');
  const [classTab, setClassTab] = useState('stream');
  const [displayClassTab, setDisplayClassTab] = useState(false);

  const handleTabChanges = (value) => {
    setDisplayClassTab(false);
    setTab(value);
  };

  const handleClassTabChanges = (value) => {
    setDisplayClassTab(true);
    setClassTab(value);
  };

  const value = {
    tab,
    classTab,
    displayClassTab,
    handleTabChanges,
    handleClassTabChanges,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export { MenuContext, MenuProvider };
