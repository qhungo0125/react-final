import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import { Edit, Margin, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import Loader from '../../components/Loader';
import ClientAxios from '../../utils/axiosConfig';

export const DashBoard = () => {
  const [classList, setClassList] = React.useState([]);

  React.useEffect(() => {
    const getClassList = async () => {
      const res = await ClientAxios.get('/classes');
      console.log('res', res.data);
      setClassList(res.data);
    };
    getClassList();
  }, []);

  return (
    <div>
      {classList.map((class_item) => {
        return (
          <div key={class_item._id}>
            <h1>{class_item.name}</h1>
            <h3>{class_item.description}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default DashBoard;
