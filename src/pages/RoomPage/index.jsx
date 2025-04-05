import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation";

const RoomPage = () => {
    const location = useLocation(); // get the name from URL
    const { name } = location.state || {};

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
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                        background: "linear-gradient(to right, #3b82f6, #10b981)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textAlign: "center"
                    }}
                >
                    {name}
                </Typography>
                </Box>
            </Container>
            </Box>
            <BottomNavigation 
                position="absolute"
                bottom={0}
            />
        </Box>
        </Box>
    )
}

export default RoomPage;