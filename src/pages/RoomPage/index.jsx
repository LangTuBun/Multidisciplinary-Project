import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import DeviceCard from "../../components/DeviceCard";
import { useState } from "react";
import InformationCard from "../../components/InformationCard";

import MainLightIcon from '../../assets/main-light.svg?react';
import LampIcon from '../../assets/lamp.svg?react';
import FanIcon from '../../assets/fan.svg?react';
import ACIcon from '../../assets/ac.svg?react';
import ClimateIcon from '../../assets/climate.svg?react';

import masterBedroomImage from "../../assets/master-bedroom.jpg";

const RoomPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // get the name from URL
    const { name } = location.state || {};
    const [lampOn, setLampOn] = useState(false);
    const [lightOn, setLightOn] = useState(false);
    const [fanOn, setFanOn] = useState(false);
    const [acOn, setAcOn] = useState(false);

    const handleClick = () => { navigate("/room/climate", {}); };

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
                    background: "linear-gradient(to bottom, #202A32 0% 70%, #2C65DB 80%, #4BF191 90% 100%)",
                    color: "white",
                    position: "relative",
                    borderRadius: 4,
                    overflowY: "scroll",
                    paddingBottom: 10,
                }}
            >
                <Box
                    component="img"
                    src={masterBedroomImage}
                    alt={name}
                    sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    }}
                />
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
                <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 1,
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
                <Grid container spacing={4} alignContent={"center"} justifyContent="center">
                    <Grid item>
                        <DeviceCard
                            name="Main Light"
                            icon={<MainLightIcon style={{ width: 40, height: 40 }} />}
                            isOn={lightOn}
                            onToggle={() => setLightOn((prev) => !prev)}
                        />
                    </Grid>
                    <Grid item>
                        <DeviceCard
                            name="Floor Lamp"
                            icon={<LampIcon style={{ width: 40, height: 40 }} />}
                            isOn={lampOn}
                            onToggle={() => setLampOn((prev) => !prev)}
                        />
                    </Grid>
                    <Grid item>
                        <DeviceCard
                            name="Fan"
                            icon={<FanIcon style={{ width: 40, height: 40 }} />}
                            isOn={fanOn}
                            onToggle={() => setFanOn((prev) => !prev)}
                        />
                    </Grid>
                    <Grid item>
                        <DeviceCard
                            name="AC"
                            icon={<ACIcon style={{ width: 40, height: 40 }} />}
                            isOn={acOn}
                            onToggle={() => setAcOn((prev) => !prev)}
                        />
                    </Grid>
                    <Grid item>
                        <Box sx={{cursor: "pointer"}} onClick={handleClick}>
                            <InformationCard
                                name="Climate"
                                icon={<ClimateIcon style={{ width: 50, height: 50 }} />}
                                description="Tap for more options."
                            />
                        </Box>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            <BottomNavigation />
        </Box>
    )
}

export default RoomPage;