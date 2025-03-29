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
      width: "100%", 
      py: 1 ,
      mx: "auto"
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
        <BottomNavigationAction icon={<RotateLeft />} />
        <BottomNavigationAction icon={<Home />} />
        <BottomNavigationAction icon={<PowerSettingsNew />} />
      </MUIBottomNavigation>
    </Box>
  );
};

export default BottomNavigation;