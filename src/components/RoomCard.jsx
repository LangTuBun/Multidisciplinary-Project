import React from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, Box, Card, CardMedia, CardContent } from '@mui/material';

const RoomCard = ({ image, name, deviceCount, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Now we navigate with the room ID in the URL and also pass state
    navigate(`/room/${id}`, { 
      state: { 
        name: name,
        roomId: id 
      } 
    });
  };
  
  return (
    <Card 
      sx={{
        borderRadius: 4,
        cursor: 'pointer',
        mb: 2,
      }}
      onClick={handleClick}
    >
      <Box
        sx = {{
          p: "4px",
          overflow: 'hidden',
          borderStyle: 'solid',
          background: "transparent",
          backgroundImage: `
            linear-gradient(#1E1E1E, #1E1E1E), 
            linear-gradient(to right, #4BF191, #2C65DB)
          `,
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          border: "1px solid transparent",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
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
            p: 2,
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            bgcolor: 'white',
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: 'gray' }}>
            {deviceCount} {deviceCount === 1 ? "Device" : "Devices"}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RoomCard;