import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import './Header.css';

const Header = ({ children, hasHiddenAuthButtons, search }) => {
  const history = useHistory();
  const [si, setSi] = useState('');

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

  const handleSearch = (e) => {
    setSi(e.target.value);
    search(e.target.value);
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
              <TextField
                className='search-desktop'
                id='search'
                variant='outlined'
                name='search'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Search color='primary' />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
                value={si}
                fullWidth
                placeholder='Search for items/categories'
                style={{ marginRight: '350px' }}
              />
              <Button variant='text' onClick={login}>
                Login
              </Button>
              <Button
                variant='contained'
                style={{ padding: '5px' }}
                type='primary'
                onClick={register}
              >
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
