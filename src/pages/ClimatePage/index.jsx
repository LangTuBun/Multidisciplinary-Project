import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Container } from "@mui/material";
import BottomNavigation from "../../components/BottomNavigation";
import TemperatureDial from "../../components/TemperatureDial";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import TemperatureIcon from "../../assets/climate.svg?react";
import HumidityIcon from "../../assets/humidity.svg?react";
import Typography from "@mui/material/Typography";
import React from "react";
import InformationCard from "../../components/InformationCard";
import ReportButton from "../../components/ReportButton";
import ReportIcon from "../../assets/report.svg?react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchAirQuality, fetchWeatherData } from "../../services/api";


const ClimatePage = () => {
  const params = useParams();
  const [ inside_temperature, setInsideTemp ] = useState(30);
  const [ inside_humidity, setInsideHumidity ] = useState(49);
  const [ outside_temp, setOutsideTemp ] = useState(30) ;
  const navigate = useNavigate();
  const handleViewTempClick = () => {
    navigate(`/rooms/${roomId}/temperature`);
  };
  const handleViewHumidClick = () => {
    navigate(`/rooms/${roomId}/humidity`);
  };
  const roomId = params.id || (location.state && location.state.roomId);

  const fetchParameters = async () => {
    try {
      const response = await fetchAirQuality(roomId) ;

      if (!response.statusText || response.statusText != "OK") {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = response.data ;
      console.log("Parameters data:", data) ;

      if (!('humidity' in data)) {
        throw new Error(`Humidity is not provided`)
      }
      if (!('temperature' in data)) {
        throw new Error(`Temperature is not provided`)
      }
      
      setInsideHumidity(data.humidity)
      setInsideTemp(data.temperature)

    } catch (err) {
      console.error("Error fetching parameters data:", err);
    }
  }

  const _fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetchWeatherData(latitude, longitude) ;

      if (!response.statusText || response.statusText != "OK") {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = response.data ;
      console.log("Weather data:", data) ;
      if (!('temperature' in data)) {
        throw new Error(`Temperature is not provided`)
      }

      setOutsideTemp(data.temperature) ;

    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  }

  useEffect(() => {
    console.log("roomId:", roomId)
    fetchParameters()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("latitude, longitude", latitude, longitude)
          _fetchWeatherData(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          _fetchWeatherData(10.77, 106.66);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser. Using default location.");  
      _fetchWeatherData(10.77, 106.66);
    }
  }, [roomId])

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
            color: "black",
            position: "relative",
            overflowY: "scroll",
              "&::-webkit-scrollbar": {
                  display: "none",
              },
            borderRadius: 4,
            paddingBottom: 10,
            background: "linear-gradient(to bottom, #202A32 0% 70%, #2C65DB 80%, #4BF191 90% 100%)",
        }}
      >
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
              mb: 2,
              }}
            >
                <Box sx={{ py: 2, paddingTop: 6, display: "flex", justifyContent: "center", width: "100%" }}> 
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            background: "linear-gradient(to right, #3b82f6, #10b981)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {"Climate"}
                    </Typography>
                </Box>
            </Container>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mb: 2 }}>
              <TemperatureDial temperature={outside_temp} mode="Outside" />
            </Box>
            <Grid container spacing={4} alignContent={"center"} justifyContent="center">
              <Grid item>
                <InformationCard
                  name="Inside Humidity."
                  icon={<HumidityIcon style={{ width: 50, height: 50 }} />}
                  data={inside_humidity + "%"}
                ></InformationCard>
              </Grid>
              <Grid item>
                <InformationCard
                  name="Inside Temp."
                  icon={<TemperatureIcon style={{ width: 50, height: 50 }} />}
                  data={inside_temperature + "°C"}
                ></InformationCard>
              </Grid>
            </Grid>
            <Grid container spacing={10} alignContent={"center"} justifyContent="center" marginTop={4}>
              <Grid item onClick={() => handleViewHumidClick()} sx={{ cursor: "pointer" }}>
                <ReportButton
                  name="Humidity Report"
                  icon={<ReportIcon style={{ width: 30, height: 30 }} />}
                />
              </Grid>
              <Grid item onClick={() => handleViewTempClick()} sx={{ cursor: "pointer" }}>
                <ReportButton
                  name="Temps Report"
                  icon={<ReportIcon style={{ width: 30, height: 30 }} />}
                />
              </Grid>
            </Grid>
          </Box>
      </Box>
      <BottomNavigation />
    </Box>
  );
}

export default ClimatePage;