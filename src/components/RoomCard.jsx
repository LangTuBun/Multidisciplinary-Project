import React from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, Box, Card, CardMedia, CardContent } from '@mui/material';

const RoomCard = ({ image, name, deviceCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/rooms', { state: { name: name } });
  };
  

  return (
    <Card 
      sx={{
        p: "2px", // This creates the "border"
        my: 2,
        borderRadius: 2,
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Box
        sx = {{
          backgroundColor: '#2C2C2C',
          overflow: 'hidden',
          borderRadius: 2,
          borderWidth: 2,
          borderStyle: 'solid',
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(to right, #2C65DB, #4BF191)",
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            borderImageSource: "linear-gradient(to right, #4BF191, #2C65DB)",
          },
          transition: 'background-color 0.3s, box-shadow 0.3s',
          width: '100%',
          display: 'flex',
        }}
      >
        <CardMedia
          component="img"
          sx={{ 
            width: 200, 
            height: 200, 
            objectFit: 'cover' 
          }}
          image={image}
          alt={name}
        />
        <CardContent 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            color: 'white',
            py: 2,
            px: 3,
            '&:last-child': {
              paddingBottom: 2
            }
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {deviceCount} Devices
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RoomCard;