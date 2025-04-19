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
  { time: "3", value: 22 },
  { time: "6", value: 24 },
  { time: "9", value: 27 },
  { time: "12", value: 30 },
  { time: "15", value: 32 },
  { time: "18", value: 30 },
  { time: "21", value: 27 },
  { time: "24", value: 23 },
];

const outdoorData = [
  { time: "3", value: 15 },
  { time: "6", value: 18 },
  { time: "9", value: 22 },
  { time: "12", value: 26 },
  { time: "15", value: 30 },
  { time: "18", value: 28 },
  { time: "21", value: 24 },
  { time: "24", value: 18 },
];

export default function TemperaturePage() {
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
            Temperature Report
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
            Average: 26°C | Low: 19°C | High: 35°C
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
            Average: 24°C | Low: 12°C | High: 32°C
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
                    <stop offset="0%" stopColor="#3467DA" />
                    <stop offset="100%" stopColor="#F58A46" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 40]} stroke="#94a3b8" axisLine={false} tickLine={false} tickFormatter={(value) => `${value}°C`}/>
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
