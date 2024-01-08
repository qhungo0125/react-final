import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../context/MenuContext';
import ClientAxios from '../../utils/axiosConfig';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import StudentInviteModal from './studentInvite';
import TeacherInviteModal from './teacherInvite';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';

function People() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentModelOpen, setStudentModelOpen] = useState(false);
  const [teacherModelOpen, setTeacherModelOpen] = useState(false);
  const menuContext = useContext(MenuContext);
  const { classId } = useParams();

  useEffect(() => {
    console.log('classId', classId);
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
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            borderBottom: '2px solid black',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
          }}
        >
          <Typography variant='h5' component='div'>
            {t('label.class.teachers')}
          </Typography>
          <IconButton
            color='primary'
            size='small'
            onClick={() => {
              setTeacherModelOpen((prev) => !prev);
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Typography variant='body1' component='div'>
          {teachers.map((teacher) => (
            <div key={teacher._id}>{teacher.name}</div>
          ))}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '40px' }}>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            borderBottom: '2px solid black',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
          }}
        >
          <Typography variant='h5' component='div'>
            {t('label.class.students')}
          </Typography>
          <IconButton
            color='primary'
            size='small'
            onClick={() => {
              setStudentModelOpen((prev) => !prev);
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Typography variant='body1' component='div'>
          {students.map((student) => (
            <div key={student._id}>{student.name}</div>
          ))}
        </Typography>
      </Box>
      <StudentInviteModal
        open={studentModelOpen}
        classId={classId}
        handleClose={() => {
          setStudentModelOpen(false);
        }}
      />
      <TeacherInviteModal
        open={teacherModelOpen}
        classId={classId}
        handleClose={() => {
          setTeacherModelOpen(false);
        }}
      />
    </Box>
  );
}

export default People;
