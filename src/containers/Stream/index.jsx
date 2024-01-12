import { useEffect, useState } from 'react';
import ClientAxios from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';

function Stream() {
  console.log('Stream');
  const [infoClass, setInfoClass] = useState({});
  const { classId } = useParams();
  // const [teachers, setTeachers] = useState([]);
  // const [students, setStudents] = useState([]);
  // const menuContext = useContext(MenuContext);
  // const { classId } = menuContext;
  useEffect(() => {
    const getClassById = async () => {
      const res = await ClientAxios.get('/class', { params: { id: classId } });
      setInfoClass(res.data.class);
      // setTeachers(res.data.teachers);
      // setStudents(res.data.students);
    };
    classId && getClassById();
  }, [classId]);
  return (
    <div className='card mx-auto w-75'>
      <img
        src='https://wallpapers.com/images/hd/virtual-classroom-background-xl1p59ku6y834y02.jpg'
        className='card-img-top'
        alt={infoClass._id}
      />
      <div className='card-body'>
        <h5 className='card-title'>{infoClass.name}</h5>
        <p className='card-text'>{infoClass.description}</p>
        {localStorage.getItem("role") === "teacher" && <p className='card-text'>Invitation Code: {infoClass.invitationCode}</p>}
      </div>
    </div>
  );
}

export default Stream;
