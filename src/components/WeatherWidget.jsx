import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress, Divider } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const API_BASE_URL = "http://localhost:8000";


const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await fetch(`http://localhost:8000/api/main/weather?lat=${latitude}&lon=${longitude}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to get location. Using default location.");

          fetchWeatherData(44.34, 10.99);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser. Using default location.");  
      fetchWeatherData(44.34, 10.99);
    }
  }, []);



  // Get appropriate weather icon based on weather description
  const getWeatherIcon = (description) => {
    const desc = description ? description.toLowerCase() : '';
    
    if (desc.includes('sun') || desc.includes('clear')) {
      return <WbSunnyIcon sx={{ mr: 1, color: 'orange' }} />;
    } else if (desc.includes('rain') || desc.includes('shower')) {
      return <UmbrellaIcon sx={{ mr: 1, color: 'lightblue' }} />;
    } else if (desc.includes('thunder') || desc.includes('storm')) {
      return <ThunderstormIcon sx={{ mr: 1, color: 'lightblue' }} />;
    } else if (desc.includes('snow') || desc.includes('ice')) {
      return <AcUnitIcon sx={{ mr: 1, color: 'white' }} />;
    } else {
      return <WbCloudyIcon sx={{ mr: 1, color: 'lightgray' }} />;
    }
  };

  if (loading) {
    return (
      <Container 
        maxWidth="sm" 
        sx={{ 
          background: "linear-gradient(to right, #3b82f6, #10b981)",
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          borderRadius: 3, 
          p: 2,
          color: 'white',
          height: 100
        }}
      >
        <CircularProgress color="inherit" size={30} />
      </Container>
    );
  }

  if (error || !weatherData) {
    return (
      <Container 
        maxWidth="sm" 
        sx={{ 
          background: "linear-gradient(to right, #3b82f6, #10b981)",
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderRadius: 3, 
          p: 2,
          color: 'white'
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Weather
          </Typography>
          <Typography variant="h6">
            Unavailable
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            --°
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        background: "linear-gradient(to right, #3b82f6, #10b981)",
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3, 
        p: 2,
        color: 'white'
      }}
    >
      {/* Top Section - Main Weather Info */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        mb: 1
      }}>
        {/* Left Side - Location Info */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {weatherData.location || "My Location"}
          </Typography>
          <Typography variant="h6">
            {weatherData.location || "Ho Chi Minh City"}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {getWeatherIcon(weatherData.weather)}
            <Typography variant="body2" sx={{ textTransform: 'capitalize', color: 'white' }}>
              {weatherData.weather || "Partially Cloudy"}
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Temperature Info */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            {Math.round(weatherData.temperature)}°
          </Typography>
          <Typography variant="body2">
            H: {Math.round(weatherData.high)}° L: {Math.round(weatherData.low)}°
          </Typography>
        </Box>
      </Box>
      
      {/* Divider */}
      <Divider sx={{ my: 1, bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
      
      {/* Bottom Section - Humidity */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        mt: 1 
      }}>
        <WaterDropIcon sx={{ mr: 1, color: '#90caf9' }} />
        <Typography variant="body1">
          Humidity: {weatherData.humidity || 0}%
        </Typography>
      </Box>
    </Container>
  );
};

export default WeatherWidget;