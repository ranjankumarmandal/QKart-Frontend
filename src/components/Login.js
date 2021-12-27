import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { config } from '../App';
import Footer from './Footer';
import Header from './Header';
import './Login.css';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const persistLogin = (token, username, balance) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('balance', balance);
  };

  const login = async (event) => {
    console.log(username, password);
    if (username !== '' && password !== '') {
      try {
      } catch (error) {}
      try {
        let response = await axios.post(config.endpoint + '/auth/login', {
          username,
          password,
        });
        enqueueSnackbar('Logged in successfully', { variant: 'success' });
        setUsername('');
        setPassword('');
        console.log(response);
        history.push('/', { from: 'Login' });
        persistLogin(
          response.data.token,
          response.data.username,
          response.data.balance
        );
        window.location.reload();
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          console.log(error.response.data.message);
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
        } else {
          enqueueSnackbar(
            'Something went wrong. Check that the backend is running, reachable and returns valid JSON.',
            { variant: 'error' }
          );
        }
      }
    } else if (username === '') {
      enqueueSnackbar('Username is a required field', { variant: 'error' });
    } else {
      enqueueSnackbar('Password is a required field', { variant: 'error' });
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
          <h2 className='title'>Login</h2>
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
            fullWidth
            placeholder='Enter a password with minimum 6 characters'
          />
          <Button className='button' variant='contained' onClick={login}>
            Login To QKart
          </Button>
          <p className='secondary-action'>
            Don't have an account? <Link to='/register'>Register Now</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
