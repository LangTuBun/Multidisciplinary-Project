import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  CircularProgress
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
  { time: "3", value: 55 },
  { time: "6", value: 65 },
  { time: "9", value: 75 },
  { time: "12", value: 80 },
  { time: "15", value: 82 },
  { time: "18", value: 80 },
  { time: "21", value: 75 },
  { time: "24", value: 55 },
];

// Static indoor data for 7 days
const indoorData7d = [
  { time: "Mon", value: 60 },
  { time: "Tue", value: 68 },
  { time: "Wed", value: 72 },
  { time: "Thu", value: 78 },
  { time: "Fri", value: 75 },
  { time: "Sat", value: 70 },
  { time: "Sun", value: 65 },
];

export default function HumidityPage() {
  const [range, setRange] = useState("24hrs");
  const [indoorData, setIndoorData] = useState(indoorData24h);
  const [outdoorData, setOutdoorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [outdoorStats, setOutdoorStats] = useState({
    average: "--",
    low: "--",
    high: "--",
  });

  // Update indoor data when range changes
  useEffect(() => {
    setIndoorData(range === "24hrs" ? indoorData24h : indoorData7d);
  }, [range]);

  // Calculate indoor stats
  const indoorAvg = Math.round(indoorData.reduce((sum, item) => sum + item.value, 0) / indoorData.length);
  const indoorLow = Math.min(...indoorData.map(item => item.value));
  const indoorHigh = Math.max(...indoorData.map(item => item.value));

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        setLoading(true);
        
        // Fetch from your weather API endpoint instead of the humidity-specific endpoint
        const response = await fetch(`http://localhost:8000/api/main/weather?lat=${latitude}&lon=${longitude}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract humidity value from weather data
        // Note: Assuming your weather API returns humidity in the response
        const baseHumidity = data.humidity || 50;
        
        let genOutdoorData = [];
        
        if (range === "24hrs") {
          // Generate 24-hour data based on current humidity with some variation
          genOutdoorData = [
            { time: "3", value: Math.max(0, Math.min(100, Math.round(baseHumidity - 15))) },
            { time: "6", value: Math.max(0, Math.min(100, Math.round(baseHumidity - 10))) },
            { time: "9", value: Math.max(0, Math.min(100, Math.round(baseHumidity - 5))) },
            { time: "12", value: Math.max(0, Math.min(100, Math.round(baseHumidity))) },
            { time: "15", value: Math.max(0, Math.min(100, Math.round(baseHumidity + 5))) },
            { time: "18", value: Math.max(0, Math.min(100, Math.round(baseHumidity + 10))) },
            { time: "21", value: Math.max(0, Math.min(100, Math.round(baseHumidity + 5))) },
            { time: "24", value: Math.max(0, Math.min(100, Math.round(baseHumidity))) },
          ];
        } else {
          // Generate 7-day data with more variation
          genOutdoorData = [
            { time: "Mon", value: Math.max(0, Math.min(100, Math.round(baseHumidity - 10))) },
            { time: "Tue", value: Math.max(0, Math.min(100, Math.round(baseHumidity - 5))) },
            { time: "Wed", value: Math.max(0, Math.min(100, Math.round(baseHumidity))) },
            { time: "Thu", value: Math.max(0, Math.min(100, Math.round(baseHumidity + 8))) },
            { time: "Fri", value: Math.max(0, Math.min(100, Math.round(baseHumidity + 12))) },
            { time: "Sat", value: Math.max(0, Math.min(100, Math.round(baseHumidity + 5))) },
            { time: "Sun", value: Math.max(0, Math.min(100, Math.round(baseHumidity - 3))) },
          ];
        }
        
        setOutdoorData(genOutdoorData);
        
        // Calculate outdoor stats
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
        
        // Fallback to static data in case of error
        const fallbackData = range === "24hrs" ? [
          { time: "3", value: 30 },
          { time: "6", value: 35 },
          { time: "9", value: 40 },
          { time: "12", value: 45 },
          { time: "15", value: 70 },
          { time: "18", value: 75 },
          { time: "21", value: 65 },
          { time: "24", value: 50 },
        ] : [
          { time: "Mon", value: 35 },
          { time: "Tue", value: 40 },
          { time: "Wed", value: 50 },
          { time: "Thu", value: 65 },
          { time: "Fri", value: 70 },
          { time: "Sat", value: 60 },
          { time: "Sun", value: 45 },
        ];
        
        setOutdoorData(fallbackData);
        
        // Calculate fallback stats
        const values = fallbackData.map(item => item.value);
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        setOutdoorStats({
          average: Math.round(avg),
          low: Math.min(...values),
          high: Math.max(...values),
        });
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
            Humidity Report
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

        <Box sx={{px: 2, py: 1 }}>
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
                  {indoorAvg}%
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  Low:
                </Typography>
                <Typography variant="body2" color="#2C65DB" mb={1}>
                  {indoorLow}%
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  High:
                </Typography>
                <Typography variant="body2" color="#F58B45" mb={1}>
                  {indoorHigh}%
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
                  <linearGradient id="indoorGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#3C8CE7" />
                    <stop offset="50%" stopColor="#00EAFF" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    color: "white",
                  }}
                  labelStyle={{ color: "white" }}
                  formatter={(value) => [`${value}%`, "Humidity"]}
                />
                <Bar
                  dataKey="value"
                  fill="url(#indoorGradient)"
                  radius={[20, 20, 20, 20]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box px={2} py={1}>
          <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            ☁️ Outdoor
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  Average:
                </Typography>
                <Typography variant="body2" color="#fff" mb={1}>
                  {outdoorStats.average}%
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  Low:
                </Typography>
                <Typography variant="body2" color="#2C65DB" mb={1}>
                  {outdoorStats.low}%
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="#fff" mb={1}>
                  High:
                </Typography>
                <Typography variant="body2" color="#F58B45" mb={1}>
                  {outdoorStats.high}%
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
                    <linearGradient id="outdoorGradient" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#38A2D7" />
                      <stop offset="50%" stopColor="#57D0FF" />
                      <stop offset="100%" stopColor="#8FE9FF" />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    stroke="#94a3b8"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="#94a3b8"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      color: "white",
                    }}
                    labelStyle={{ color: "white" }}
                    formatter={(value) => [`${value}%`, "Humidity"]}
                  />
                  <Bar
                    dataKey="value"
                    fill="url(#outdoorGradient)"
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