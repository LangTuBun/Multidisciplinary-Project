import { useNavigate } from "react-router-dom";
import { Grid, Box, Container } from "@mui/material";
import BottomNavigation from "../../components/BottomNavigation";
import TemperatureDial from "../../components/TemperatureDial";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import TemperatureIcon from "../../assets/climate.svg?react";
import HumidityIcon from "../../assets/humidity.svg?react";
import Typography from "@mui/material/Typography";
import React from "react";
import InformationCard from "../../components/InformationCard";
import ReportButton from "../../components/ReportButton";
import ReportIcon from "../../assets/report.svg?react";


const ClimatePage = () => {
  const inside_temperature = 30;
  const inside_humidity = 49;
  const navigate = useNavigate();
  const handleViewTempClick = () => {
    navigate("/temperature");
  };
  const handleViewHumidClick = () => {
    navigate("/humidity");
  };

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
            color: "black",
            position: "relative",
            overflowY: "scroll",
              "&::-webkit-scrollbar": {
                  display: "none",
              },
            borderRadius: 4,
            paddingBottom: 10,
            background: "linear-gradient(to bottom, #202A32 0% 70%, #2C65DB 80%, #4BF191 90% 100%)",
        }}
      >
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
              mb: 2,
              }}
            >
                <Box sx={{ py: 2, paddingTop: 6, display: "flex", justifyContent: "center", width: "100%" }}> 
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            background: "linear-gradient(to right, #3b82f6, #10b981)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {"Climate"}
                    </Typography>
                </Box>
            </Container>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mb: 2 }}>
              <TemperatureDial temperature={30} mode="Heating" />
            </Box>
            <Grid container spacing={4} alignContent={"center"} justifyContent="center">
              <Grid item>
                <InformationCard
                  name="Inside Humidity."
                  icon={<HumidityIcon style={{ width: 50, height: 50 }} />}
                  data={inside_humidity + "%"}
                ></InformationCard>
              </Grid>
              <Grid item>
                <InformationCard
                  name="Inside Temp."
                  icon={<TemperatureIcon style={{ width: 50, height: 50 }} />}
                  data={inside_temperature + "°C"}
                ></InformationCard>
              </Grid>
            </Grid>
            <Grid container spacing={10} alignContent={"center"} justifyContent="center" marginTop={4}>
              <Grid item onClick={() => handleViewHumidClick()} sx={{ cursor: "pointer" }}>
                <ReportButton
                  name="Humidity Report"
                  icon={<ReportIcon style={{ width: 30, height: 30 }} />}
                />
              </Grid>
              <Grid item onClick={() => handleViewTempClick()} sx={{ cursor: "pointer" }}>
                <ReportButton
                  name="Temps Report"
                  icon={<ReportIcon style={{ width: 30, height: 30 }} />}
                />
              </Grid>
            </Grid>
          </Box>
      </Box>
      <BottomNavigation />
    </Box>
  );
}

export default ClimatePage;