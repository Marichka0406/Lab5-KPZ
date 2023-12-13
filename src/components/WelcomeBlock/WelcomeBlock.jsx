import { Box, Typography } from "@mui/material";
import { styles } from "./WelcomeBlock.styles.js";

const WelcomeBlock = () => {
  return (
    <Box
     sx= {styles.welcomeBlockWrapper}
    >
      <Typography variant="h1">Welcome!</Typography>
    </Box>
  );
};
export default WelcomeBlock;
