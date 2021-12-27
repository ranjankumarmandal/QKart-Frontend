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
        <div>register/login</div>
      )}
    </Box>
  );
};

export default Header;
