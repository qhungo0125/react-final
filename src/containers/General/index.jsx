import {} from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../context/MenuContext';
import ClientAxios from '../../utils/axiosConfig';

function General() {
  const [infoClass, setInfoClass] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const menuContext = useContext(MenuContext);
  const { classId } = menuContext;

  useEffect(() => {
    const getClassList = async () => {
      const res = await ClientAxios.get('/class', { params: { id: classId } });
      setInfoClass(res.data.class);
      setTeachers(res.data.teachers);
      setStudents(res.data.students);
    };
    getClassList();
  }, []);
  return (
    <Box sx={{ maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Box className="G-input">
        <label>ID</label>
        <TextField
          multiline
          variant="standard"
          size="small"
          sx={{ width: '300px' }}
          InputProps={{
            readOnly: true,
          }}
          value={infoClass._id}
        />
      </Box>
      <Box className="G-input">
        <label>Class Name</label>
        <TextField
          multiline
          variant="standard"
          size="small"
          sx={{ width: '300px' }}
          InputProps={{
            readOnly: true,
          }}
          value={infoClass.name}
        />
      </Box>
      <Box className="G-input">
        <label>Student number</label>
        <TextField
          multiline
          variant="standard"
          size="small"
          sx={{ width: '140px' }}
          InputProps={{
            readOnly: true,
          }}
          value={students.length}
        />
      </Box>
    </Box>
  );
}

export default General;
