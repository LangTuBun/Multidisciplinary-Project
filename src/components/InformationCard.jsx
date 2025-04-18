
import { Box, Typography } from "@mui/material";

const InformationCard = ({ name, icon, description, data }) => {

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
        background: "#17303a",
        color: "white",
        border: "2px solid rgba(255,255,255,0.2)",
        boxShadow: 2,
      }}
    >
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
        fontSize="1rem"
        mt={1}
      >
        {name}
      </Typography>
      {description && <Typography
        align="center"
        fontWeight="bold"
        fontSize="0.75rem"
        color="gray"
        mt={1}
      >
        {description}
      </Typography>}
      {data && <Typography
        align="center"
        fontWeight="bold"
        fontSize="1rem"
      >
        {data}
      </Typography>}
    </Box>
  );
};

export default InformationCard;