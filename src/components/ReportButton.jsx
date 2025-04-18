import { Box, Typography } from "@mui/material";

const ReportButton = ({icon, name}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* Circle with icon */}
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, #17475D, #113D54)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        {icon}
      </Box>

      {/* Label */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: 16,
          mt: 1,
          color: "white",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default ReportButton;
