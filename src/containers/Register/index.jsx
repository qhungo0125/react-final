import SInput from '../../components/Custom/SInput';
import SButton from '../../components/Custom/SButton';
import './styles.css';
import '../Login/styles.css';
import Box from '@mui/system/Box';
import { Apple, Email, Google, Password } from '@mui/icons-material';
import useRegisterState from './state';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const styles = {
  signup: {
    text: 'Create account',
    bgColor: '#187b87',
    hoverColor: '#609aa5',
    color: '#fff',
    icon: '',
  },

  signup_w_gg: {
    text: 'Sign up with Google',
    bgColor: '#fff',
    hoverColor: '#e6e6e6',
    color: '#000000',
    icon: <Google fontSize="inherit" />,
  },
  signup_w_apple: {
    text: 'Sign up with Apple',
    bgColor: '#000000',
    hoverColor: '#333333',
    color: '#fff',
    icon: <Apple fontSize="inherit" />,
  },
};

function Register() {
  const {
    formData,
    errors,
    loading,
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handleRegister,
  } = useRegisterState();

  
  if (loading){
    styles.signup.text = 'Loading...';
  }else{
    styles.signup.text = 'Create account';
  }

  const [role, setRole] = useState('student'); // Initial state is an empty string

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const { name, email, password } = formData;
  const { name: nameError, email: emailError, password: passError } = errors;

  return (
    <div className="login_background">
      <div className="login_wrapper">
        <Box
          className="login_form"
          component="form"
          sx={{
            '& .MuiTextField-root': { marginBlock: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <h2 style={{ textAlign: 'center' }}>Create account</h2>
          <SInput
            label={'Name'}
            value={name}
            onInputChange={handleNameChange}
          />
          <span style={{ color: 'red', fontSize: '12px', marginLeft: '15px' }}>
            {nameError}
          </span>
          <SInput
            label={'Email'}
            value={email}
            onInputChange={handleEmailChange}
          />
          <span style={{ color: 'red', fontSize: '12px', marginLeft: '15px' }}>
            {emailError}
          </span>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === 'student'}
                onChange={handleRoleChange}
              />
              Student
            </label>
            <label style={{ marginLeft: '10px' }}>
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={role === 'teacher'}
                onChange={handleRoleChange}
              />
              Teacher
            </label>
          </div>
          <SInput
            label={'Password'}
            type={'password'}
            value={password}
            onInputChange={handlePasswordChange}
          />
          <span style={{ color: 'red', fontSize: '12px', marginLeft: '15px' }}>
            {passError}
          </span>
          <div style={{ marginTop: '10px', fontSize: '12px' }}>
            <SButton styles={styles.signup} onButtonClick={()=>handleRegister(role)} />
          </div>
          <div
            style={{
              marginTop: '10px',
              textAlign: 'left',
              fontSize: '10px',
              color: '#acacab',
            }}
          >
            Already have an account? &nbsp;
            <Link
              to="/login"
              color="#000000"
              fontSize={'10px'}
              fontWeight={'500'}
            >
              Log in
            </Link>
          </div>
          <div style={{ marginTop: '10px', fontSize: '11px' }}>
            <SButton styles={styles.signup_w_gg} />
          </div>
        </Box>
        <Box
          sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: "block" } }}
          className="login_image"
        >
          <img src="./login_bg.jpg" />
        </Box>
      </div>
    </div>
  );
}

export default Register;
