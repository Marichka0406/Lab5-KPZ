import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Масив логінів і паролів, які можуть підійти
  const validLogins = [
    { username: "Maria0406", password: "0406" },
    { username: "JohnDoe", password: "12345" },
    { username: "AliceSmith", password: "pass123" },
    { username: "BobJohnson", password: "qwerty" },
    // Додайте інші об'єкти логінів, які можуть підійти
  ];

  const handleLogin = () => {
    const isValidLogin = validLogins.some(
      (login) => login.username === username && login.password === password
    );

    if (isValidLogin) {
      onLogin(true);
      navigate("/");
    } else {
      toast.error("Incorrect username or password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      onLogin(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <StyledGrid item xs={12} sm={6} md={4}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#B00020",
            color: "white",
            "&:hover": {
              backgroundColor: "#7f0019",
            },
          }}
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
        <ToastContainer />
      </StyledGrid>
    </Grid>
  );
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
}));

export default LoginPage;
