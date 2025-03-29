import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';

const WeatherWidget = () => {
  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        background: "linear-gradient(to right, #3b82f6, #10b981)",
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#2C2C2C', 
        borderRadius: 3, 
        p: 2,
        color: 'white'
      }}
    >
      {/* Left Side - Location Info */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          My Location
        </Typography>
        <Typography variant="h6">
          Ho Chi Minh City
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <WbCloudyIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Partially Cloudy
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Temperature Info */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          26°
        </Typography>
        <Typography variant="body2">
          H: 29° L: 22°
        </Typography>
      </Box>
    </Container>
  );
};

export default WeatherWidget;