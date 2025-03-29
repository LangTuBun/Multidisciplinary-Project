import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent } from '@mui/material';

const RoomCard = ({ image, name, deviceCount }) => {
  return (
    <Card 
      sx={{ 
        display: 'flex', 
        mb: 2, 
        backgroundColor: '#2C2C2C', 
        borderRadius: 3,
        overflow: 'hidden',
        my: 5
      }}
    >
      <CardMedia
        component="img"
        sx={{ 
          width: 100, 
          height: 100, 
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
    </Card>
  );
};

export default RoomCard;