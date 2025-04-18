import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ThermostatAuto,
  WaterDrop,
} from "@mui/icons-material";
import CloudIcon from '@mui/icons-material/Cloud';
import HouseIcon from '@mui/icons-material/House';

const NotificationCard = ({ type, indoorValue, outdoorValue, date }) => {
  const [actionDialogOpen, setActionDialogOpen] = useState(false);

  const handleOpenActions = () => {
    setActionDialogOpen(true);
  };

  const handleCloseActions = () => {
    setActionDialogOpen(false);
  };

  return (
    <Box
      sx={{
        borderRadius: 4,
        p: 1,
        mb: 2,
        color: "white",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        backgroundImage: `
        linear-gradient(#1E1E1E, #1E1E1E), 
        linear-gradient(to right, #1e3a8a, #164e63)
        `,
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        border: "1px solid transparent",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
    <Box sx={{p: 1}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {type === "temperature" ? (
            <ThermostatAuto sx={{ mr: 1, color: "#10b981" }} />
          ) : (
            <WaterDrop sx={{ mr: 1, color: "#10b981" }} />
          )}
          <Typography variant="subtitle1" fontWeight={600}>
            {type === "temperature" ? "ABNORMAL TEMPERATURE DETECTED" : "ABNORMAL HUMIDITY DETECTED"}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
          {date}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ mb: 1.5 }}>
        {type === "temperature" 
          ? "Indoor temperature is higher than outdoor" 
          : "Indoor humidity is higher than outdoor"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <HouseIcon sx={{ fontSize: 18, mr: 1, color: "#94a3b8" }} />
          <Typography variant="body2">
            Indoor: {type === "temperature" ? `${indoorValue} °C` : `${indoorValue}%`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CloudIcon sx={{ fontSize: 18, mr: 1, color: "#94a3b8" }} />
          <Typography variant="body2">
            Outdoor: {type === "temperature" ? `${outdoorValue} °C` : `${outdoorValue}%`}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button
          size="small"
          onClick={handleOpenActions}
          sx={{
            color: "#38bdf8",
            textTransform: "none",
            p: 0,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          View recommended actions
        </Button>
      </Box>

      <Dialog open={actionDialogOpen} onClose={handleCloseActions}>
        <DialogTitle>
          {type === "temperature"
            ? "Temperature Recommendations"
            : "Humidity Recommendations"}
        </DialogTitle>
        <DialogContent>
          {type === "temperature" ? (
            <>
              <Typography variant="body1" paragraph>
                Your indoor temperature is significantly higher than outdoor. Here are some recommendations:
              </Typography>
              <Typography variant="body2" component="ul">
                <li>Open windows to allow cooler outdoor air to circulate</li>
                <li>Adjust your thermostat settings</li>
                <li>Check if heating systems are running unnecessarily</li>
                <li>Ensure vents aren't blocked</li>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1" paragraph>
                Your indoor humidity is higher than recommended levels. Here are some recommendations:
              </Typography>
              <Typography variant="body2" component="ul">
                <li>Run a dehumidifier to reduce moisture</li>
                <li>Ensure proper ventilation in humid areas like bathrooms and kitchen</li>
                <li>Check for any water leaks or plumbing issues</li>
                <li>Use exhaust fans when cooking or showering</li>
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActions}>Close</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Box>
  );
};

export default NotificationCard;