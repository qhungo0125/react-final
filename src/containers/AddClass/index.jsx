import {} from '@mui/icons-material';
import { Button, Box, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ClientAxios from '../../utils/axiosConfig';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../context/MenuContext';

function AddClass() {
  const [info, setInfo] = useState({
    name: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);

  const handleCreateClass = async () => {
    if (!info.name || !info.description) return alert('Please fill all fields');
    try {
      setIsLoading(true);
      await ClientAxios.post('/class/create', info);
      setIsLoading(false);
      alert(`Class was created successfully`);
      menuContext.handleTabChanges('home');
      navigate('/classes');
    } catch (error) {
      console.error('Error create class', error);
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Box sx={{ height: '150px' }}>
        <Box className='G-input'>
          <label>Class Name</label>
          <TextField
            multiline
            variant='standard'
            size='small'
            sx={{ width: '300px' }}
            value={info.name}
            onChange={(e) => {
              setInfo({ ...info, name: e.target.value });
            }}
          />
        </Box>
        <Box className='G-input'>
          <label>Class Description</label>
          <TextField
            multiline
            variant='standard'
            size='small'
            sx={{ width: '300px' }}
            value={info.description}
            onChange={(e) => {
              setInfo({ ...info, description: e.target.value });
            }}
          />
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant='contained'
          onClick={handleCreateClass}
          disabled={isLoading}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default AddClass;
