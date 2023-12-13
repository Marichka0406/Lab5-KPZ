import backgroundImage from "../assets/welcome.jpg";
import "../styles/styles.scss";
import { Box, Typography } from "@mui/material";

const WelcomeBlock = () => {
  return (
    <Box
      className="welcome-block"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Typography variant="h1">Welcome!</Typography>
    </Box>
  );
};
export default WelcomeBlock;
