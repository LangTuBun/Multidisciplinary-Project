import { Box, Container } from "@mui/material";
import React from "react";

const HumidityPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        mb: 3,
      }}
    >
      <Box sx={{ py: 2, display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(to right, #3b82f6, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Humidity Page
        </Typography>
      </Box>
    </Container>
  );
}

export default HumidityPage;