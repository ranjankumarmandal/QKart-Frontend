import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { config } from '../App';
import Footer from './Footer';
import Header from './Header';
import './Register.css';

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const validateInput = (event) => {
    if (!username) {
      enqueueSnackbar('Username is a required field.', { variant: 'error' });
      return false;
    }
    if (username.length < 6) {
      enqueueSnackbar('Username must be at least 6 characters long.', {
        variant: 'error',
      });
      return false;
    }
    if (username.length > 32) {
      enqueueSnackbar('Username must not exceed max length of 32.', {
        variant: 'error',
      });
      return false;
    }
    if (!password) {
      enqueueSnackbar('Password is a required field.', { variant: 'error' });
      return false;
    }
    if (password.length < 6) {
      enqueueSnackbar('Password must be at least 6 characters long.', {
        variant: 'error',
      });
      return false;
    }
    if (password.length > 32) {
      enqueueSnackbar('Password must not exceed max length of 32', {
        variant: 'error',
      });
      return false;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar('Password and confirm password do not match.', {
        variant: 'error',
      });
      return false;
    }
    return true;
  };

  const performAPICall = async () => {
    try {
      let res = await axios.post(config.endpoint + '/auth/register', {
        username,
        password,
      });
      console.log(res.message);
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (event) => {
    console.log(username, password, confirmPassword);
    let isValid = validateInput(event);

    if (isValid) {
      let apiCall = await performAPICall();
      if (apiCall) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        enqueueSnackbar('Successfully registered', { variant: 'success' });
        history.push('/login', { from: 'Register' });
        // console.log("Successfully registered"); // use mui to show popup message
      } else {
        enqueueSnackbar(
          'Username is already taken, try with other user and password!',
          { variant: 'error' }
        );
      }
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      minHeight='100vh'
    >
      <Header hasHiddenAuthButtons='explore' />
      <Box className='content'>
        <Stack spacing={2} className='form'>
          <h2 className='title'>Register</h2>
          <TextField
            id='username'
            label='Username'
            variant='outlined'
            title='Username'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='Enter Username'
            fullWidth
          />
          <TextField
            id='password'
            variant='outlined'
            label='Password'
            name='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            helperText='Password must be atleast 6 characters length'
            fullWidth
            placeholder='Enter a password with minimum 6 characters'
          />
          <TextField
            id='confirmPassword'
            variant='outlined'
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            fullWidth
          />
          <Button className='button' variant='contained' onClick={register}>
            Register Now
          </Button>
          <p className='secondary-action'>
            Already have an account? <Link to='/login'>Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
