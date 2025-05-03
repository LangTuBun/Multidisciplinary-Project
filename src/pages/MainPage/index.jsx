import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import WeatherWidget from "../../components/WeatherWidget";
import RoomCard from "../../components/RoomCard";
import BottomNavigation from "../../components/BottomNavigation";

import defaultRoomImage from "../../assets/living-room.jpg";
import masterBedroomImage from "../../assets/master-bedroom.jpg";

const avatars = [
  "/avatar/meg.jpg",
  "/avatar/peter.png",
  "/avatar/quagmire.png",
];

const MainPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        // Use the correct API endpoint
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/main/room`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Map room images based on room name
  const getRoomImage = (roomName) => {
    if (roomName === "Master Bedroom") {
      return masterBedroomImage;
    }
    return defaultRoomImage;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100%", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#1E1E1E",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "calc(100vh * 9 / 16)" }, // Responsive width
          maxWidth: "500px", // Maximum width constraint
          minHeight: "100vh",
          height: "100%",
          background: "linear-gradient(to bottom, #202A32 0% 70%, #2C65DB 80%, #4BF191 90% 100%)",
          color: "white",
          position: "relative",
          overflowY: "auto",
          paddingTop: 1,
          borderRadius: { xs: 0, sm: 4 }, // No border radius on small screens
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: { xs: 0, sm: 1 }, // Less padding on small screens
            pb: { xs: 10, sm: 12 }, // Extra padding for bottom navigation
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              mb: 3,
              px: { xs: 2, sm: 3 }, // Responsive padding
            }}
          >
            {/* Header with Welcome and Avatar */}
            <Box sx={{ 
              py: { xs: 1.5, sm: 2 }, // Responsive padding
              display: "flex", 
              justifyContent: "space-between", 
              width: "100%",
              alignItems: "center" 
            }}> 
              <Typography
                variant={isSmallScreen ? "h5" : "h4"}  // Responsive text size
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(to right, #3b82f6, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome
              </Typography>
              <Avatar src={avatars[2]} sx={{ width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }} />
            </Box>

            {/* Weather Widget */}
            <Box sx={{ 
              width: "100%", 
              mb: { xs: 2, sm: 3 },
              mt: { xs: 1, sm: 1 }
            }}>
              <WeatherWidget />
            </Box>

            {/* Section Title for Rooms */}
            <Box sx={{ mb: { xs: 1, sm: 2 }, mt: { xs: 1, sm: 1 } }}>
              <Typography 
                variant={isSmallScreen ? "subtitle1" : "h6"}
                fontWeight="medium"
                sx={{ color: 'white' }}
              >
                Your Rooms
              </Typography>
            </Box>

            {/* Room Cards */}
            <Box sx={{ width: "100%" }}>
              {loading ? (
                <Typography color="white">Loading rooms...</Typography>
              ) : error ? (
                <Typography color="error">Error: {error}</Typography>
              ) : rooms.length === 0 ? (
                <Typography color="white">No rooms found</Typography>
              ) : (
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  {rooms.map((room) => (
                    <Grid item xs={12} key={room.id}>
                      <RoomCard
                        id={room.id}
                        image={getRoomImage(room.name)}
                        name={room.name}
                        deviceCount={room.device}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Container>
        </Box>
        <BottomNavigation />
      </Box>
    </Box>
  );
};

export default MainPage;