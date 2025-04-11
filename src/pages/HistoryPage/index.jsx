import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ArrowDropDown,
  ThermostatAuto,
  WaterDrop,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import CloudIcon from '@mui/icons-material/Cloud';
import HouseIcon from '@mui/icons-material/House';
import BottomNavigation from "../../components/BottomNavigation";

const NotificationCard = ({ type, timestamp, indoorValue, outdoorValue, date }) => {
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
        background: "linear-gradient(to right, #1e3a8a, #164e63)",
        borderRadius: 2,
        p: 2,
        mb: 2,
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(to right, #3b82f6, #06b6d4)",
        },
      }}
    >
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
  );
};

const NotificationHistory = () => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [dateMenuAnchorEl, setDateMenuAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Temperature");
  const [sortOrder, setSortOrder] = useState("desc"); // Default to newest first
  
  // Sample notification data with proper date objects
  const notifications = [
    {
      id: 1,
      type: "temperature",
      date: "March 22, 14:05 PM",
      timestamp: new Date(2025, 2, 22, 14, 5), // Year, Month (0-based), Day, Hour, Minute
      indoorValue: 28,
      outdoorValue: 15,
    },
    {
      id: 2,
      type: "temperature",
      date: "March 22, 13:45 PM",
      timestamp: new Date(2025, 2, 22, 13, 45),
      indoorValue: 28,
      outdoorValue: 15,
    },
    {
      id: 3,
      type: "humidity",
      date: "March 22, 14:05 PM",
      timestamp: new Date(2025, 2, 22, 14, 5),
      indoorValue: 75,
      outdoorValue: 15,
    },
    {
      id: 4,
      type: "humidity",
      date: "March 21, 15:30 PM",
      timestamp: new Date(2025, 2, 21, 15, 30),
      indoorValue: 75,
      outdoorValue: 15,
    },
    {
      id: 5,
      type: "humidity",
      date: "March 20, 09:15 AM",
      timestamp: new Date(2025, 2, 20, 9, 15),
      indoorValue: 75,
      outdoorValue: 15,
    },
  ];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    if (filter) {
      setSelectedFilter(filter);
    }
    setFilterAnchorEl(null);
  };

  const handleDateSortClick = (event) => {
    setDateMenuAnchorEl(event.currentTarget);
  };

  const handleDateSortClose = (order) => {
    if (order) {
      setSortOrder(order);
    }
    setDateMenuAnchorEl(null);
  };

  // Filter and sort notifications
  let displayedNotifications = [...notifications];
  
  // Apply type filter
  if (selectedFilter !== "All") {
    displayedNotifications = displayedNotifications.filter(n => 
      (selectedFilter === "Temperature" && n.type === "temperature") ||
      (selectedFilter === "Humidity" && n.type === "humidity")
    );
  }
  
  // Apply date sorting
  displayedNotifications.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.timestamp - b.timestamp; // Oldest first
    } else {
      return b.timestamp - a.timestamp; // Newest first
    }
  });

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
          pb: 8, // Add bottom padding for the navigation bar
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(to right, #3b82f6, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Notification History
          </Typography>
          
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 3 }}>
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                cursor: "pointer" 
              }}
              onClick={handleDateSortClick}
            >
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                Date
              </Typography>
              {sortOrder === "desc" ? (
                <ArrowDownward sx={{ color: "#94a3b8", fontSize: 16, ml: 0.5 }} />
              ) : (
                <ArrowUpward sx={{ color: "#94a3b8", fontSize: 16, ml: 0.5 }} />
              )}
            </Box>
            <Menu
              anchorEl={dateMenuAnchorEl}
              open={Boolean(dateMenuAnchorEl)}
              onClose={() => handleDateSortClose()}
            >
              <MenuItem onClick={() => handleDateSortClose("desc")}>
                Newest First
                {sortOrder === "desc" && " ✓"}
              </MenuItem>
              <MenuItem onClick={() => handleDateSortClose("asc")}>
                Oldest First
                {sortOrder === "asc" && " ✓"}
              </MenuItem>
            </Menu>
            
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "#94a3b8", mr: 1 }}>
                Filter by
              </Typography>
              <Chip
                label={selectedFilter}
                onClick={handleFilterClick}
                deleteIcon={<ArrowDropDown />}
                onDelete={handleFilterClick}
                sx={{
                  bgcolor: "#334155",
                  color: "white",
                  borderRadius: "16px",
                  "& .MuiChip-deleteIcon": {
                    color: "white",
                  },
                }}
              />
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => handleFilterClose()}
              >
                <MenuItem onClick={() => handleFilterClose("All")}>All</MenuItem>
                <MenuItem onClick={() => handleFilterClose("Temperature")}>Temperature</MenuItem>
                <MenuItem onClick={() => handleFilterClose("Humidity")}>Humidity</MenuItem>
              </Menu>
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
            Last update: 10 minutes ago
          </Typography>

          {displayedNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              type={notification.type}
              timestamp={notification.timestamp}
              indoorValue={notification.indoorValue}
              outdoorValue={notification.outdoorValue}
              date={notification.date}
            />
          ))}
        </Box>
        
        <BottomNavigation />
      </Box>
    </Box>
  );
};

export default NotificationHistory;