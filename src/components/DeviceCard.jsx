
import { Box, Typography, Switch } from "@mui/material";

const DeviceCard = ({ name, icon, isOn, onToggle }) => {
  return (
    <Box
      sx={{
        width: 120,
        height: 120,
        borderRadius: 10,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: isOn
          ? "linear-gradient(135deg, #3b82f6, #10b981)"
          : "#17303a",
        color: "white",
        border: "2px solid rgba(255,255,255,0.2)",
        boxShadow: isOn ? 6 : 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Typography fontWeight="bold" fontSize="1.1rem">
          {isOn ? "On" : "Off"}
        </Typography>
        <Switch
          checked={isOn}
          onChange={onToggle}
          sx={{
            "& .MuiSwitch-thumb": {
              backgroundColor: "#000",
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#000",
            },
          }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ flexGrow: 1 }}
      >
        {icon}
      </Box>

      <Typography
        align="center"
        fontWeight="bold"
        fontSize="1.1rem"
        mt={1}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default DeviceCard;