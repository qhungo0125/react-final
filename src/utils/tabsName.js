function TabsName(tab) {
    var name = "";
    switch (tab) {
        case ("home"):
            name = "";
            break;
        case ("add_class"):
            name = "New Class"
            break;
        default:
            break;
    }
    return name;
}

export default TabsName;