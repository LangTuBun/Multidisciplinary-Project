import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  Container,
  AvatarGroup,
} from "@mui/material";
import { Home, Power, RotateLeft, Person } from "@mui/icons-material";
import WeatherWidget from "../../components/WeatherWidget";
import RoomCard from "../../components/RoomCard";
import BottomNavigation from "../../components/BottomNavigation";

// Import Images
import masterBedroomImage from "../../assets/master-bedroom.jpg";
import livingRoomImage from "../../assets/living-room.jpg";

const avatars = [
  "/public/avatar/meg.jpg",
  "/public/avatar/peter.png",
  "/public/avatar/quagmire.png",
];

const MainPage = () => {
  return (
    <Box
      sx={{
        // width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#1E1E1E",
      }}
    >
      <Box
        sx={{
          width: "calc(100vh * 9 / 16)",
          // height: "100vh",
          bgcolor: "#202a32",
          color: "white",
          p: 3,
          position: "relative",
          overflowY: "auto",
          pr: 1
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1, // optional: show scrollbar without overlaying content
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
              <RoomCard
                image={masterBedroomImage}
                name="Master Bedroom"
                deviceCount={3}
                room_url="master-bedroom"
              />
              <RoomCard
                image={livingRoomImage}
                name="Living Room"
                deviceCount={3}
                room_url="living-room"
              />
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
