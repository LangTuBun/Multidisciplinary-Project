import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, CircularProgress } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import DeviceCard from "../../components/DeviceCard";
import InformationCard from "../../components/InformationCard";

import MainLightIcon from '../../assets/main-light.svg?react';
import LampIcon from '../../assets/lamp.svg?react';
import FanIcon from '../../assets/fan.svg?react';
import ACIcon from '../../assets/ac.svg?react';
import ClimateIcon from '../../assets/climate.svg?react';

import masterBedroomImage from "../../assets/master-bedroom.jpg";
import defaultRoomImage from "../../assets/living-room.jpg";

const API_BASE_URL = "http://localhost:8000"; // Update with your actual API base URL

// Equipment type icons mapping
const EQUIPMENT_ICONS = {
  "Main Light": <MainLightIcon style={{ width: 40, height: 40 }} />,
  "Floor Lamp": <LampIcon style={{ width: 40, height: 40 }} />,
  "Fan": <FanIcon style={{ width: 40, height: 40 }} />,
  "AC": <ACIcon style={{ width: 40, height: 40 }} />
};

const RoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { name } = location.state || {};
  const roomId = params.id || (location.state && location.state.roomId);
  
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomName, setRoomName] = useState(name || "Room");

  // Get room image based on room name
  const getRoomImage = (roomName) => {
    if (roomName === "Master Bedroom") {
      return masterBedroomImage;
    }
    return defaultRoomImage;
  };

  // Fetch equipment data when component mounts
// In RoomPage.jsx
useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        if (!roomId) {
          throw new Error("Room ID is missing");
        }
        
        const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}/equipments`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Equipment data:", data);
        
        // Handle different API response formats
        if (Array.isArray(data)) {
          setEquipments(data);
        } else if (data.id) {
          // If it's a single object with an id, put it in an array
          setEquipments([data]);
        } else if (data.equipments && Array.isArray(data.equipments)) {
          // If it has an equipments array property
          setEquipments(data.equipments);
        } else {
          // Fallback - empty array
          setEquipments([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching equipment data:", err);
        setError("Failed to load equipment data");
        setLoading(false);
      }
    };
  
    fetchEquipmentData();
  }, [roomId]);

  // Function to toggle device status
  const toggleDevice = async (equipmentId) => {
    try {
      // Find the equipment by ID
      const equipmentToToggle = equipments.find(eq => eq.id === equipmentId);
      if (!equipmentToToggle) return;
      
      const newStatus = !equipmentToToggle.status;
      
      // Update local state optimistically
      setEquipments(equipments.map(eq => 
        eq.id === equipmentId ? { ...eq, status: newStatus } : eq
      ));
      
      // Send update to API
      const response = await fetch(`${API_BASE_URL}/api/equipments/${equipmentId}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Get the updated data from the response
      const updatedData = await response.json();
      console.log("Updated equipment:", updatedData);
      
    } catch (err) {
      console.error(`Error toggling equipment:`, err);
      // Revert local state if API call fails
      setError(`Failed to update equipment`);
      // Refresh equipment data
      fetchEquipmentData();
    }
  };

  const handleClimateClick = () => {
    navigate("/room/climate", { state: { roomId } });
  };

  if (loading) {
    return (
      <Box sx={{ 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        bgcolor: "#1E1E1E" 
      }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#1E1E1E",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          width: "calc(100vh * 9 / 16)",
          background: "linear-gradient(to bottom, #202A32 0% 70%, #2C65DB 80%, #4BF191 90% 100%)",
          color: "white",
          position: "relative",
          borderRadius: 4,
          overflowY: "scroll",
          paddingBottom: 10,
        }}
      >
        <Box
          component="img"
          src={getRoomImage(roomName)}
          alt={roomName}
          sx={{
            width: "100%",
            height: 150,
            objectFit: "cover",
          }}
        />
        <IconButton
          onClick={() => window.history.back()}
          sx={{
            position: "absolute",
            top: 30,
            left: 30,
            bgcolor: "white",
            color: "#000",
            boxShadow: 3,
            borderRadius: "10px",
            scale: 0.8,
            "&:hover": {
              bgcolor: "#f0f0f0",
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 1,
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
                  textAlign: "center"
                }}
              >
                {roomName}
              </Typography>
            </Box>
            
            {error && (
              <Typography 
                color="error" 
                sx={{ mb: 2, bgcolor: "rgba(255,0,0,0.1)", p: 1, borderRadius: 1 }}
              >
                {error}
              </Typography>
            )}
          </Container>
          <Grid container spacing={4} alignContent={"center"} justifyContent="center">
            {equipments.length > 0 ? (
              equipments.map((equipment) => (
                <Grid item key={equipment.id}>
                  <DeviceCard
                    name={equipment.name}
                    icon={EQUIPMENT_ICONS[equipment.name] || <MainLightIcon style={{ width: 40, height: 40 }} />}
                    isOn={equipment.status}
                    onToggle={() => toggleDevice(equipment.id)}
                  />
                </Grid>
              ))
            ) : (
              <Typography color="white" sx={{ my: 4 }}>
                No equipment available for this room
              </Typography>
            )}
            <Grid item>
              <Box sx={{cursor: "pointer"}} onClick={handleClimateClick}>
                <InformationCard
                  name="Climate"
                  icon={<ClimateIcon style={{ width: 50, height: 50 }} />}
                  description="Tap for more options."
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <BottomNavigation />
    </Box>
  );
};

export default RoomPage;