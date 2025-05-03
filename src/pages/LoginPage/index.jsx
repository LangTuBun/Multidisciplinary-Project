import React, { useState } from "react";
import { Box, Container, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLoginClick = () => 
        {
            if (username == "name" && password == "password") {
                navigate("/main");
            } else {
                console.log("Wrong username or password !")
            }
        };

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
                    height: "100%",
                    background: "#202A32",
                    color: "white",
                    position: "relative",
                    borderRadius: 4,
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 10,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}> 
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
                            Login
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
                        <TextField
                            variant="outlined"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                style: {
                                    borderRadius: '30px',
                                    color: '#fff',
                                    width: '300px',
                                    fontSize: '14pt',
                                    paddingLeft: '4px',
                                    paddingRight: '4px',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#a259ff',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#c084fc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#a259ff',
                                },
                                },
                            }}
                        />

                        <TextField
                            variant="outlined"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                style: {
                                    borderRadius: '30px',
                                    color: '#fff',
                                    width: '300px',
                                    fontSize: '14pt',
                                    paddingLeft: '4px',
                                    paddingRight: '4px',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#a259ff',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#c084fc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#a259ff',
                                },
                                },
                            }}
                        />
                    </Box>

                    <Button
                    variant="contained"
                    onClick={handleLoginClick}
                    sx={{
                        backgroundColor: '#a259ff',
                        color: '#fff',
                        borderRadius: '20px',
                        paddingY: 1.5,
                        paddingX: 6,
                        fontWeight: 'bold',
                        fontSize: '12pt',
                        '&:hover': {
                            backgroundColor: '#c084fc',
                        },
                    }}>
                        LOGIN
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default LoginPage;