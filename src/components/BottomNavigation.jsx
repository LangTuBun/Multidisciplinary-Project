import React, { useState } from 'react';
import { Box, BottomNavigation as MUIBottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, PowerSettingsNew, RotateLeft, Person, Calculate } from '@mui/icons-material';

const BottomNavigation = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ 
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      width: "calc(100vh * 9 / 16)",
      mx: "auto" ,
    }}>
      <MUIBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: '#2C2C2C',
          borderRadius: 3,
          '& .MuiBottomNavigationAction-root': {
            color: 'rgba(255,255,255,0.5)',
          },
          '& .Mui-selected': {
            color: 'white',
          }
        }}
      >
        <BottomNavigationAction 
          icon={<RotateLeft />} 
          href="/history"
          sx={{
            background: "transparent",
            borderRadius: "50px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(to right, #2C65DB, #4BF191)",
              color: "white",
              paddingX: 2, // Slight expansion effect
            },
          }}      
        />
        <BottomNavigationAction 
          icon={<Home />} 
          href='/'
          sx={{
            background: "transparent",
            borderRadius: "50px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(to right, #2C65DB, #4BF191)",
              color: "white",
              paddingX: 2, // Slight expansion effect
            },
          }}
        />
        <BottomNavigationAction 
          icon={<PowerSettingsNew />} 
          sx={{
            background: "transparent",
            borderRadius: "50px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(to right, #2C65DB, #4BF191)",
              color: "white",
              paddingX: 2, // Slight expansion effect
            },
          }}
        />
      </MUIBottomNavigation>
    </Box>
  );
};

export default BottomNavigation;