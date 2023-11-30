import { useState, createContext } from "react";

const MenuContext = createContext();

function MenuProvider({ children }) {
    const [tab, setTab] = useState("home")
    const [classTab, setClassTab] = useState("stream");
    const [displayClassTab, setDisplayClassTab] = useState(false)

    const handleTabChanges = (value) => {
        setTab(value)
    }

    const handleClassTabChanges = (value) => {
        setClassTab(value)
    }

    const handleDisplayClassTab = (value) => {
        setDisplayClassTab(value)
    }

    const value = {
        tab,
        classTab,
        displayClassTab,
        handleTabChanges,
        handleClassTabChanges,
        handleDisplayClassTab
    }

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
}

export { MenuContext, MenuProvider };
