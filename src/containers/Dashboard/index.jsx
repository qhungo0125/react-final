
import React from 'react';
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
import {
    Edit,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import Loader from "../../components/Loader"
import AvatarModal from './AvatarModal';
import ClientAxios from '../../utils/axiosConfig';

const DEFAULT_AVATAR = "https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg"

export const DashBoard = () => {
    const navigate = useNavigate();

    const [isLoading, setLoading] = React.useState(true);
    const [openAvatarModal, setOpenAvatarModal] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false);

    //edit avatar
    const handleEditAvatar = () => {
        setOpenAvatarModal(true)
    }

    //show password
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //info fields
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [region, setRegion] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [dob, setDOB] = React.useState('');
    const [currentAvatar, setCurrentAvatar] = React.useState('')
    const [newAvatarFile, setNewAvatarFile] = React.useState(null)


    //fetch data
    React.useEffect(() => {
        setLoading(true);
    const userId = localStorage.getItem('userid');
        const getData = async (userId) => {
            // const responseData = await axios.get(`/auth/profile/${userId}`);
            console.log(`Bearer ${localStorage.getItem('token')}`);
            const responseData = await  ClientAxios.get(`/accounts/auth/profile/${userId}`);

            if (responseData) {
                const {
                    name: first_name,
                    region,
                    phone: telephone,
                    email,
                    password,
                    sex,
                    avatar,
                    DOB,
                } = responseData.data;

                setFirstName(first_name);
                setLastName("last_name");
                setRegion(region);
                setPhone(telephone);
                setEmail(email);
                setPass(password);
                setGender(sex);
                setCurrentAvatar((avatar ? avatar : DEFAULT_AVATAR));
                setDOB(DOB);

                setLoading(false);
                // console.log('responseData: ', responseData);
            }
        };

        if (userId) {
            getData(userId);
        } else {
            alert('You are not logined beforeeee');
            navigate('/login');
        }
    }, []);

    //save changes
    const handleSaveChanges = () => {
        setLoading(true)

        //FormData
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('sex', gender);
        formData.append('telephone', phone);
        formData.append('DOB', dob);
        formData.append('region', region);
        if (newAvatarFile && newAvatarFile instanceof File)
            formData.append(`avatar`, newAvatarFile);

        axios({
            method: 'put',
            url: `https://react-mid-term.onrender.com/api/user/update`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: formData,
        }).then(
            (respone) => {
                setLoading(false)
                alert('Update successful.');
            },
            (error) => {
                setLoading(false)
                alert('Update failed.');
            },
        );
    };
    return (
    <div>
        Dashboard
    </div>
    );
}

export default DashBoard;