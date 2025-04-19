import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BottomNavigation from "../../components/BottomNavigation";

const indoorData = [
  { time: "3", value: 55 },
  { time: "6", value: 65 },
  { time: "9", value: 75 },
  { time: "12", value: 80 },
  { time: "15", value: 82 },
  { time: "55", value: 80 },
  { time: "21", value: 75 },
  { time: "24", value: 55 },
];

const outdoorData = [
  { time: "3", value: 30 },
  { time: "6", value: 35 },
  { time: "9", value: 40 },
  { time: "12", value: 45 },
  { time: "15", value: 70 },
  { time: "18", value: 75 },
  { time: "21", value: 65 },
  { time: "24", value: 50 },
];

export default function HumidityPage() {
  const [range, setRange] = React.useState("24hrs");
  const theme = useTheme();

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
          px={2}
          py={2}
        >
          <IconButton sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(to right, #3b82f6, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Humidity Report
          </Typography>
          <Select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            sx={{
              bgcolor: "#1c1f2a",
              color: "white",
              borderRadius: 1,
              height: "32px",
              fontSize: "0.8rem",
              "& .MuiSelect-icon": { color: "white" },
            }}
            size="small"
          >
            <MenuItem value="24hrs">24hrs</MenuItem>
            <MenuItem value="7days">7 days</MenuItem>
          </Select>
        </Box>

        <Box px={2} py={1}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            🏠 Indoor
          </Typography>
          <Typography variant="body2" color="#94a3b8" mb={1}>
            Average: 60% | Low: 50% | High: 82%
          </Typography>
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
                    <stop offset="0%" stop-color="#F58A46" />
                    <stop offset="25%" stop-color="#FFD700" />
                    <stop offset="50%" stop-color="#32CD32" />
                    <stop offset="75%" stop-color="#1E90FF" />
                    <stop offset="90%" stop-color="#6A0DAD" />
                    <stop offset="100%" stop-color="#6A0DAD" />
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
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            ☁️ Outdoor
          </Typography>
          <Typography variant="body2" color="#94a3b8" mb={1}>
            Average: 60% | Low: 27% | High: 75%
          </Typography>
          <Box
            sx={{
              bgcolor: "#1e293b",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={outdoorData}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stop-color="#F58A46" />
                    <stop offset="25%" stop-color="#FFD700" />
                    <stop offset="50%" stop-color="#32CD32" />
                    <stop offset="75%" stop-color="#1E90FF" />
                    <stop offset="90%" stop-color="#6A0DAD" />
                    <stop offset="100%" stop-color="#6A0DAD" />
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

        <BottomNavigation />
      </Box>
    </Box>
  );
}
