import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../context/MenuContext';
import ClientAxios from '../../utils/axiosConfig';

function People() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const menuContext = useContext(MenuContext);
  const { classId } = menuContext;

  useEffect(() => {
    const getClassById = async () => {
      const res = await ClientAxios.get('/class', {
        params: { id: classId },
      });
      setStudents(res.data.students);
      setTeachers(res.data.teachers);
    };
    getClassById();
  }, []);

  return (
    <Box sx={{ width: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Box>
        <Typography
          variant="h5"
          component="div"
          sx={{ borderBottom: '2px solid black', marginBottom: '15px' }}
        >
          Teachers
        </Typography>
        <Typography variant="body1" component="div">
          {teachers.map((teacher) => (
            <div key={teacher._id}>{teacher.name}</div>
          ))}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '40px' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ borderBottom: '2px solid black', marginBottom: '15px' }}
        >
          Students
        </Typography>
        <Typography variant="body1" component="div">
          {students.map((student) => (
            <div key={student._id}>{student.name}</div>
          ))}
        </Typography>
      </Box>
    </Box>
  );
}

export default People;
