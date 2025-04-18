import React from "react";
import { Box, Typography } from "@mui/material";

const TemperatureDial = ({ temperature = 22, mode = "Heating" }) => {
  const radius = 100;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const minTemp = 0;
  const maxTemp = 60;

  const tempPercent = (temperature - minTemp) / (maxTemp - minTemp);
  const progress = circumference * (1 - tempPercent);

  return (
    <Box
      sx={{
        position: "relative",
        width: 275,
        height: 275,
        borderRadius: "50%",
        background: "radial-gradient(#ccc, #333)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* SVG circular track */}
      <svg width="100%" height="100%" viewBox="0 0 300 300">
        <circle
          cx="150"
          cy="150"
          r={radius}
          stroke="#444"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="150"
          cy="150"
          r={radius}
          stroke="url(#tempGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform="rotate(-270 150 150)"
        />

        <defs>
          <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Tick Marks */}
        {[...Array(13)].map((_, i) => {
          const angle = ((i / 24) * 360 - 180) * (Math.PI / 180); // 240 degree arc
          const x1 = 150 + Math.cos(angle) * 112;
          const y1 = 150 + Math.sin(angle) * 112;
          const x2 = 150 + Math.cos(angle) * 120;
          const y2 = 150 + Math.sin(angle) * 120;

          const labelX = 150 + Math.cos(angle) * 135;
          const labelY = 150 + Math.sin(angle) * 135;

          return (
            <g key={i}>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ccc"
                strokeWidth={i % 6 === 0 ? 3 : 1.5}
            />
            {i % 6 === 0 && (
                <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="15"
                fill="#ccc"
                >
                {(i / 6 + 1)*15}°
                </text>
            )}
            </g>
          );
        })}
      </svg>

      {/* Text in the center */}
      <Box
        sx={{
          position: "absolute",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="grey.700">
          {mode}
        </Typography>
        <Typography variant="h3" fontWeight="bold" color="grey.800">
          {temperature}°
        </Typography>
      </Box>
    </Box>
  );
};

export default TemperatureDial;
