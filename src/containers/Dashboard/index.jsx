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
            const responseData = await axios.get(`/user/${userId}`);
            if (responseData) {
                const {
                    first_name,
                    last_name,
                    region,
                    telephone,
                    email,
                    password,
                    sex,
                    avatar,
                    DOB,
                } = responseData.data.data;

                setFirstName(first_name);
                setLastName(last_name);
                setRegion(region);
                setPhone(telephone);
                setEmail(email);
                setPass(password);
                setGender(sex);
                setCurrentAvatar((avatar ? avatar : DEFAULT_AVATAR));
                setDOB(DOB);

                setLoading(false);
                console.log('responseData: ', responseData);
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
        <Grid width={'100%'} container spacing={2} sx={{ mt: 2 }}>
            <Loader open={isLoading} />
            <Grid container alignItems="center" justifyContent="center">
                <Grid item textAlign={'center'} sx={{ position: 'relative' }}>
                    <img
                        src={newAvatarFile ? newAvatarFile.preview : currentAvatar}
                        height={200}
                        style={{ borderRadius: '50%' }}
                    ></img>
                    <IconButton
                        style={{ background: '#fff' }}
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            fontSize: '20px'
                        }}
                        onClick={handleEditAvatar}
                    >
                        <Edit fontSize="inherit" />
                    </IconButton >
                </Grid>
            </Grid>

            <AvatarModal
                open={openAvatarModal}
                closeModel={() => setOpenAvatarModal(false)}
                setNewAvatarFile={(new_avatar_file) => { setNewAvatarFile(new_avatar_file) }}
                currentAvatar={currentAvatar}
            />

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">Region</InputLabel>
                    <Select
                        value={region}
                        label="Region"
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        <MenuItem value={'Viet Nam'}>Viet Nam</MenuItem>
                        <MenuItem value={'USA'}>USA</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    fullWidth
                    label="Phone"
                    type="text"
                    variant="outlined"
                    // value={formatPhoneNumber('84123232233')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                    <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="Female"
                        />
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Date of birth"
                            value={dayjs(dob)}
                            onChange={(newValue) => setDOB(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>

            <Grid item sm={12} textAlign={'center'} sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Grid>

        </Grid>
    );
};
