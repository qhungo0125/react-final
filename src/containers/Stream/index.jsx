import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../context/MenuContext';
import ClientAxios from '../../utils/axiosConfig';

function Stream() {
  const [infoClass, setInfoClass] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const menuContext = useContext(MenuContext);
  const { classId } = menuContext;
  useEffect(() => {
    const getClassById = async () => {
      const res = await ClientAxios.get('/class', { params: { id: classId } });
      setInfoClass(res.data.class);
      setTeachers(res.data.teachers);
      setStudents(res.data.students);
    };
    getClassById();
  }, [classId]);
  return (
    <div className="card mx-auto w-75">
      <img
        src="https://wallpapers.com/images/hd/virtual-classroom-background-xl1p59ku6y834y02.jpg"
        className="card-img-top"
        style={{ height: 18 + 'rem' }}
        alt={infoClass._id}
      />
      <div className="card-body">
        <h5 className="card-title">{infoClass.name}</h5>
        <p className="card-text">{infoClass.description}</p>
      </div>
    </div>
  );
}

export default Stream;
