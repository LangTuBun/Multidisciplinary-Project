import React from "react";
import {
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Home, Power, RotateLeft, Person } from "@mui/icons-material";
import BottomNavigation from "../../components/BottomNavigation";

const HistoryPage = () => {
  return (
    <Box
      sx={{
        // width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#1E1E1E",
      }}
    >
      <Box
        sx={{
          width: "calc(100vh * 9 / 16)",
          // height: "100vh",
          bgcolor: "#202a32",
          color: "white",
          p: 3,
          position: "relative",
          overflowY: "auto",
          pr: 1
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1, // optional: show scrollbar without overlaying content
          }}
        >
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
                History Page
              </Typography>
            </Box>
          </Container>
        </Box>
        <BottomNavigation />
      </Box>
    </Box>
  );
};

export default HistoryPage;
