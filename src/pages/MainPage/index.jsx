import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Container } from "@mui/material";
import WeatherWidget from "../../components/WeatherWidget";
import RoomCard from "../../components/RoomCard";
import BottomNavigation from "../../components/BottomNavigation";

// Import placeholder images
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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        // Use the correct API endpoint
        const response = await fetch('http://localhost:8000/api/main/room');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Rooms data:", data); // Debug logging
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

  console.log("Rendering with rooms:", rooms); // Debug logging

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#1E1E1E",
      }}
    >
      <Box
        sx={{
          width: "calc(100vh * 9 / 16)",
          background: "linear-gradient(to bottom, #202A32 0% 70%, #2C65DB 80%, #4BF191 90% 100%)",
          color: "white",
          position: "relative",
          overflowY: "scroll",
          paddingTop: 1,
          borderRadius: 4,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1,
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              mb: 3,
            }}
          >
            <Box sx={{ py: 2, display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(to right, #3b82f6, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome
              </Typography>
              <Avatar src={avatars[2]} />
            </Box>

            {/* Weather Widget */}
            <WeatherWidget />

            {/* Room Cards */}
            <Box sx={{ mt: 4, width: "100%" }}>
              {loading ? (
                <Typography color="white">Loading rooms...</Typography>
              ) : error ? (
                <Typography color="error">Error: {error}</Typography>
              ) : rooms.length === 0 ? (
                <Typography color="white">No rooms found</Typography>
              ) : (
                rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    image={getRoomImage(room.name)}
                    name={room.name}
                    deviceCount={room.device}
                    room_url={room.name.toLowerCase().replace(/\s+/g, '-')}
                  />
                ))
              )}
            </Box>
          </Container>
        </Box>
        <BottomNavigation 
          position="absolute"
          bottom={0}
        />
      </Box>
    </Box>
  );
};

export default MainPage;