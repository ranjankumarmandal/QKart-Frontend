import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import './Header.css';

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/', { from: 'Header' });
  };

  const register = () => {
    history.push('/register', { from: 'Header' });
  };

  const login = () => {
    history.push('/login', { from: 'Header' });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('balance');
    window.location.reload();
  };

  return (
    <Box className='header'>
      <Box className='header-title'>
        <img src='logo_light.svg' alt='QKart-icon'></img>
      </Box>
      {hasHiddenAuthButtons === 'explore' ? (
        <Button
          className='explore-button'
          startIcon={<ArrowBackIcon />}
          variant='text'
          onClick={handleClick}
        >
          Back to explore
        </Button>
      ) : (
        <Stack direction='row' spacing={2}>
          {localStorage.getItem('username') ? (
            <>
              <Avatar alt={localStorage.getItem('username')} src='avatar.png' />

              <div className='header-info'>
                {localStorage.getItem('username')}
              </div>

              <Button variant='text' type='primary' onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant='text' onClick={login}>
                Login
              </Button>
              <Button variant='contained' type='primary' onClick={register}>
                Register
              </Button>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Header;
