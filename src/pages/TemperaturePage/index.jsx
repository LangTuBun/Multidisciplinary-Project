import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BottomNavigation from "../../components/BottomNavigation";

// Static indoor data for 24 hours
const indoorData24h = [
  { time: "3", value: 22 },
  { time: "6", value: 24 },
  { time: "9", value: 27 },
  { time: "12", value: 30 },
  { time: "15", value: 32 },
  { time: "18", value: 30 },
  { time: "21", value: 27 },
  { time: "24", value: 23 },
];

// Static indoor data for 7 days (using day names instead of hour numbers)
const indoorData7d = [
  { time: "Mon", value: 24 },
  { time: "Tue", value: 25 },
  { time: "Wed", value: 27 },
  { time: "Thu", value: 29 },
  { time: "Fri", value: 28 },
  { time: "Sat", value: 26 },
  { time: "Sun", value: 25 },
];

export default function TemperaturePage() {
  const [range, setRange] = useState("24hrs");
  const [outdoorData, setOutdoorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [outdoorStats, setOutdoorStats] = useState({
    average: "--",
    low: "--",
    high: "--",
  });
  const [indoorData, setIndoorData] = useState(indoorData24h);

  // Update indoor data when range changes
  useEffect(() => {
    setIndoorData(range === "24hrs" ? indoorData24h : indoorData7d);
  }, [range]);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/main/weather?lat=${latitude}&lon=${longitude}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Generate data based on selected range
        let genOutdoorData = [];
        
        if (range === "24hrs") {
          // Generate 24-hour data
          const baseTemp = data.temperature || 25;
          genOutdoorData = [
            { time: "3", value: Math.round(baseTemp - 5) },
            { time: "6", value: Math.round(baseTemp - 3) },
            { time: "9", value: Math.round(baseTemp) },
            { time: "12", value: Math.round(baseTemp + 3) },
            { time: "15", value: Math.round(baseTemp + 5) },
            { time: "18", value: Math.round(baseTemp + 2) },
            { time: "21", value: Math.round(baseTemp - 1) },
            { time: "24", value: Math.round(baseTemp - 4) },
          ];
        } else {
          // Generate 7-day data with more variation
          const baseTemp = data.temperature || 25;
          genOutdoorData = [
            { time: "Mon", value: Math.round(baseTemp - 2) },
            { time: "Tue", value: Math.round(baseTemp - 1) },
            { time: "Wed", value: Math.round(baseTemp + 1) },
            { time: "Thu", value: Math.round(baseTemp + 3) },
            { time: "Fri", value: Math.round(baseTemp + 2) },
            { time: "Sat", value: Math.round(baseTemp) },
            { time: "Sun", value: Math.round(baseTemp - 1) },
          ];
        }
        
        setOutdoorData(genOutdoorData);
        
        // Calculate stats
        const values = genOutdoorData.map(item => item.value);
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);
        
        setOutdoorStats({
          average: Math.round(avg),
          low: min,
          high: max,
        });
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
          fetchWeatherData(44.34, 10.99); // Default coordinates
        }
      );
    } else {
      setError("Geolocation is not supported by this browser. Using default location.");  
      fetchWeatherData(44.34, 10.99); // Default coordinates
    }
  }, [range]); // Re-fetch when range changes

  // Calculate indoor stats based on current indoorData
  const indoorAvg = Math.round(indoorData.reduce((sum, item) => sum + item.value, 0) / indoorData.length);
  const indoorLow = Math.min(...indoorData.map(item => item.value));
  const indoorHigh = Math.max(...indoorData.map(item => item.value));

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
          width: { xs: "100%", sm: "450px" },
          maxWidth: "450px",
          bgcolor: "#202a32",
          color: "white",
          position: "relative",
          overflowY: "auto",
          pb: 8,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={1}
          py={2}
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
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(to right, #3b82f6, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 6,
              paddingBottom: 2,
            }}
          >
            Temperature Report
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", px: 2, paddingBottom: 1 }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#fff", paddingRight: 2 }}>
            Date range
          </Typography>
          <Select
            value={range}
            onChange={(e) => {
              setRange(e.target.value);
              setLoading(true); // Show loading while data updates
            }}
            sx={{
              bgcolor: "#1c1f2a",
              color: "white",
              borderRadius: 4,
              height: "32px",
              fontSize: "0.8rem",
              border: "2px solid #ffffff",
              "& .MuiSelect-icon": { color: "white" },
            }}
            size="small"
          >
            <MenuItem value="24hrs">24hrs</MenuItem>
            <MenuItem value="7days">7 days</MenuItem>
          </Select>
        </Box>

        <Box px={2} py={1}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" fontWeight={600} gutterBottom>
              🏠 Indoor
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  Average:
                </Typography>
                <Typography variant="body2" color="#fff" mb={1}>
                  {indoorAvg}°C
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  Low:
                </Typography>
                <Typography variant="body2" color="#2C65DB" mb={1}>
                  {indoorLow}°C
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  High:
                </Typography>
                <Typography variant="body2" color="#F58B45" mb={1}>
                  {indoorHigh}°C
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#1e293b",
              borderRadius: 2,
              p: 2,
              mb: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={indoorData}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#3467DA" />
                    <stop offset="100%" stopColor="#F58A46" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false} />
                <YAxis
                  domain={[0, 40]}
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}°C`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    color: "white",
                  }}
                  labelStyle={{ color: "white" }}
                  formatter={(value) => [`${value}°C`, "Temperature"]}
                />
                <Bar
                  dataKey="value"
                  fill="url(#gradient)"
                  radius={[20, 20, 20, 20]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box px={2} py={1}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1" fontWeight={600} gutterBottom>
              🌡️ Outdoor
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  Average:
                </Typography>
                <Typography variant="body2" color="#fff" mb={1}>
                  {outdoorStats.average}°C
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  Low:
                </Typography>
                <Typography variant="body2" color="#2C65DB" mb={1}>
                  {outdoorStats.low}°C
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  High:
                </Typography>
                <Typography variant="body2" color="#F58B45" mb={1}>
                  {outdoorStats.high}°C
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#1e293b",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 160 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : error ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 160 }}>
                <Typography color="error">Failed to load outdoor data</Typography>
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={outdoorData}>
                  <defs>
                    <linearGradient id="gradientOutdoor" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#3467DA" />
                      <stop offset="100%" stopColor="#F58A46" />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8" 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    domain={[0, 40]} 
                    stroke="#94a3b8" 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `${value}°C`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      color: "white",
                    }}
                    labelStyle={{ color: "white" }}
                    formatter={(value) => [`${value}°C`, "Temperature"]}
                  />
                  <Bar
                    dataKey="value"
                    fill="url(#gradientOutdoor)"
                    radius={[20, 20, 20, 20]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Box>
      </Box>
      <BottomNavigation />
    </Box>
  );
}