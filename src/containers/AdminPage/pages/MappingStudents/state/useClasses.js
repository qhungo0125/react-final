import React from 'react';
import { getClass, getClasses } from '../../../../../api/admin';

// get all active classes
const useClasses = () => {
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState();
  const [classInfo, setClassInfo] = React.useState({});
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    const getClassData = async () => {
      try {
        setLoading(true);
        const response = await getClass({
          id: selectedClass,
          fields: ['_id', 'email', 'name', 'mapCode'],
        });
        if (response && response.data) {
          setClassInfo(response.data.class);
          setStudents(response.data.students);
          console.log(response.data.students);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getClassData();
  }, [selectedClass]);

  React.useEffect(() => {
    const getClassesData = async () => {
      try {
        setLoading(true);
        const response = await getClasses({
          page: 1,
          limit: 200,
          filter: { isActived: true },
        });
        if (
          response &&
          response.data &&
          response.data.classes &&
          response.data.classes.length > 0
        ) {
          setClasses(response.data.classes);
          setSelectedClass(response.data.classes[0]._id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getClassesData();
  }, []);

  return {
    classes,
    loading,
    selectedClass,
    setSelectedClass,
    classInfo,
    students,
  };
};

export default useClasses;
