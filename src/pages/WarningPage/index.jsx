import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ErrorIcon from '@mui/icons-material/Error';

const WarningPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // get the name from URL
    const { message } = location.state || {};
    const id = 1;
    const room_name = "Living room" ;


    const handleActionClick = () => { navigate(`/room/${id}`, {state: {name: room_name, roomId: id}}); };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                bgcolor: "#1E1E1E",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            <Box
                sx={{
                    width: "calc(100vh * 9 / 16)",
                    background: "#ffe8d9",
                    color: "white",
                    position: "relative",
                    borderRadius: 4,
                    overflowY: "scroll",
                    paddingBottom: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
                    paddingTop: 5,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}> 
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{
                                background: "#d73e3d",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                textAlign: "center"
                            }}
                        >
                            Warning
                        </Typography>
                    </Box>
                </Container>
                <IconButton
                    onClick={() => window.history.back()}
                    sx={{
                    position: "absolute",
                    top: 30,
                    left: 30,
                    bgcolor: "white",
                    color: "#000",
                    boxShadow: 3,
                    borderRadius: "10px",
                    scale: 0.8,
                    "&:hover": {
                        bgcolor: "#f0f0f0",
                    },
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Box sx={{
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    bgcolor: '#EEEEEE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 4,
                    mt: 10,
                    mb: 10,
                }}>
                    <ErrorIcon sx={{ fontSize: 200, color: "#d73e3d" }} />
                </Box>
                <Box>
                    <Typography sx={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: "#d73e3d",
                        textAlign: "center",
                        marginBottom: 2}}>
                        {message}
                    </Typography>
                </Box>
                <Box sx={{width: "100%", height: 100, justifyContent: "center", alignItems: "center", 
                    display: "flex", flexDirection: "column",
                    position: "absolute", bottom: 5}}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleActionClick}
                        sx={{ 
                            fontWeight: 'bold', borderRadius: 999,
                            paddingTop: 2, paddingBottom: 2,
                            paddingLeft: 10, paddingRight: 10,
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        Goto Action
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default WarningPage;