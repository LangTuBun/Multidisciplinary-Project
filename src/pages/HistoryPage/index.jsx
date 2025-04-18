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
import NotificationCard from "../../components/NotificationCard";

const NotificationHistory = () => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [dateMenuAnchorEl, setDateMenuAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Temperature");
  const [sortOrder, setSortOrder] = useState("desc");
  
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
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Notification History
          </Typography>
          
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 3 }}>
            <Box 
              sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                p: 1,
              }}
              onClick={handleDateSortClick}
            >
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Date
              </Typography>
              {sortOrder === "desc" ? (
                <ArrowDownward sx={{ color: "#fff", fontSize: 20, ml: 0.5 }} />
              ) : (
                <ArrowUpward sx={{ color: "#fff", fontSize: 20, ml: 0.5 }} />
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
              <Typography variant="body2" sx={{ color: "#fff", mr: 1 }}>
                Filter by
              </Typography>
              <Chip
                label={selectedFilter}
                onClick={handleFilterClick}
                deleteIcon={<ArrowDropDown />}
                onDelete={handleFilterClick}
                sx={{
                  bgcolor: "transparent",
                  color: "white",
                  borderRadius: "16px",
                  "& .MuiChip-deleteIcon": {
                    color: "white",
                  },
                  border: "2px solid #fff",
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
          
          <Typography variant="body2" sx={{ color: "#94FFC1", mb: 2 }}>
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
        
      </Box>
      <BottomNavigation />
    </Box>
  );
};

export default NotificationHistory;