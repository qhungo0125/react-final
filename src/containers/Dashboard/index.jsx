import React, { useContext, useEffect } from 'react';
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
import { MenuContext } from '../../context/MenuContext';

export const DashBoard = () => {
  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);
  const [classList, setClassList] = React.useState([]);

  React.useEffect(() => {
    const getClassList = async () => {
      const userId = localStorage.getItem('userid');
      let url = '/classes';
      if (userId) {
        url += `?userId=${userId}`;
      }
      const res = await ClientAxios.get(url);
      setClassList(res.data);
    };
    getClassList();
  }, []);

  const handleClassSelect = (class_id) => {
    const { classId } = menuContext;
    menuContext.updateClassId(class_id);
    menuContext.handleClassTabChanges('stream');
    navigate(`/class/stream?id=${class_id}`);
  };

  return (
    <>
      {classList.map((class_item) => {
        return (
          <div
            className="card d-inline-flex m-3"
            key={class_item._id}
            style={{ width: 18 + 'rem', cursor: 'pointer' }}
            onClick={() => handleClassSelect(class_item._id)}
          >
            <img
              src="https://wallpapers.com/images/hd/virtual-classroom-background-xl1p59ku6y834y02.jpg"
              className="card-img-top"
              alt={class_item._id}
            />
            <div className="card-body">
              <h5 className="card-title">{class_item.name}</h5>
              <p className="card-text">{class_item.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DashBoard;
