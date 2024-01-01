import { useState, createContext } from 'react';

const MenuContext = createContext({
  tab: 'home',
  classTab: 'stream',
  displayClassTab: false,
  classId: null,
  teacherId: null,
  semester: null,
  handleTabChanges: () => { },
  handleClassTabChanges: () => { },
  updateClassId: () => { },
});

function MenuProvider({ children }) {
  const [tab, setTab] = useState('home');
  const [classTab, setClassTab] = useState('stream');
  const [displayClassTab, setDisplayClassTab] = useState(false);
  const [classId, setClassId] = useState("");

  const handleTabChanges = (value) => {
    setDisplayClassTab(false);
    setTab(value);
  };

  const handleClassTabChanges = (value) => {
    setDisplayClassTab(true);
    setClassTab(value);
  };

  const updateClassId = (value) => {
    setDisplayClassTab(false);
    setClassId(value);
  };

  const value = {
    tab,
    classTab,
    displayClassTab,
    classId,
    handleTabChanges,
    handleClassTabChanges,
    updateClassId,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export { MenuContext, MenuProvider };
